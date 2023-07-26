import { Payment } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { IPaymentDal } from '../dal';
import { IPaymentLogic } from './payment.interface';

export class PaymentLogic implements IPaymentLogic {
    private dal: IPaymentDal;

    constructor(dal: IPaymentDal) {
        this.dal = dal;
    }

    get(id: string): Payment {
        return this.dal.get(id);
    }

    getByEmail(email: string): Payment[] {
        return this.dal.getByEmail(email);
    }

    add(email: string, productId: string, creditCardNumber: string, quantity: number): Payment {
        const payment: Payment = {
            id: uuidv4(),
            userEmail: email,
            productId,
            creditCardNumber,
            quantity,
            date: new Date().toISOString(),
        };

        this.dal.add(payment);
        return payment;
    }

    remove(id: string): void {
        this.dal.remove(id);
    }
}
