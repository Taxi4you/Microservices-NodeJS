import { Payment } from '../types';

export interface IPaymentDal {
    get(id: string): Payment;
    getByEmail(email: string): Payment[];
    add(payment: Payment): void;
    remove(id: string): void;
}
