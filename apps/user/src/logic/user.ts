import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserDal } from '../dal';
import { IUserLogic } from './user.interface';
import { TokenPayload } from '../types';
import { isTokenStructureValid } from '@nodejs-microservices/utils';

export class UserLogic implements IUserLogic {
    private dal: IUserDal;

    constructor(dal: IUserDal) {
        this.dal = dal;
    }

    async signup(email: string, password: string): Promise<string> {
        const salt: string = await this.generateSalt();
        const userPassword: string = await this.generatePassword(password, salt);

        this.dal.add(email, { email, password: userPassword, salt });

        return await this.generateSignature({ email });
    }

    async login(email: string, password: string): Promise<string> {
        const existingCustomer = this.dal.get(email);
        if (!existingCustomer) {
            return null;
        }

        const validPassword = await this.validatePassword(password, existingCustomer.password, existingCustomer.salt);
        if (!validPassword) {
            return null;
        }

        return await this.generateSignature({ email });
    }

    async validateToken(token: string): Promise<TokenPayload> {
        if (!isTokenStructureValid(token)) {
            return null;
        }

        return await jwt.verify(token.split(' ')[1], process.env.APP_SECRET);
    }

    doesEmailExist(email: string): boolean {
        return this.dal.exists(email);
    }

    private async generateSalt(): Promise<string> {
        return await bcrypt.genSalt();
    }

    private async generatePassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    private async validatePassword(enteredPassword: string, savedPassword: string, salt: string): Promise<boolean> {
        return (await this.generatePassword(enteredPassword, salt)) === savedPassword;
    }

    private async generateSignature(payload: TokenPayload): Promise<string> {
        return await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '1d' });
    }
}
