import { Payment } from '../../types';
import { IPaymentLogic } from '../../logic';
import { IHandler } from './handler.interface';
import { isNullOrUndefined, PaymentQueueMessage } from '@nodejs-microservices/utils';

export class Handler implements IHandler {
    private logic: IPaymentLogic;

    constructor(logic: IPaymentLogic) {
        this.logic = logic;
    }

    handle(message: PaymentQueueMessage): void {
        try {
            if (isNullOrUndefined(message.emailToRemove)) {
                return;
            }

            const payments: Payment[] = this.logic.getByEmail(message.emailToRemove);
            for (const payment of payments) {
                this.logic.remove(payment.id);
            }
        } catch (error) {
            // We are logging the error here to prevent it from being propagated and causing the application to crash
            console.error(error);
        }
    }
}
