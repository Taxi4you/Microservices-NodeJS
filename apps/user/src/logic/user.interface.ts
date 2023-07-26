import { TokenPayload } from '../types';

export interface IUserLogic {
    signup(email: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    validateToken(token: string): Promise<TokenPayload>;
    doesEmailExist(email: string): boolean;
}
