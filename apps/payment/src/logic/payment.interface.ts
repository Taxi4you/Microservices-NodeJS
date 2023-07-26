import { Payment } from '../types';

export interface IPaymentLogic {
    get(id: string): Payment;
    getByEmail(email: string): Payment[];
    add(email: string, productId: string, creditCardNumber: string, quantity: number): Payment;
    remove(id: string): void;
}
