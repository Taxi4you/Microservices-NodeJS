import { Payment } from '../types';
import { IPaymentDal } from './payment.interface';

const payments: Payment[] = [];

export class PaymentDal implements IPaymentDal {
    get(id: string): Payment {
        return payments.find((p: Payment) => p.id === id);
    }

    getByEmail(email: string): Payment[] {
        return payments.filter((p: Payment) => p.userEmail === email);
    }

    add(payment: Payment): void {
        payments.push(payment);
    }

    remove(id: string): void {
        const index = payments.findIndex((p: Payment) => p.id === id);
        if (index !== -1) {
            payments.splice(index, 1);
        }
    }
}
