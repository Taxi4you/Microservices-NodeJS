import { Product } from '../../types';
import { IHandler } from './handler.interface';
import { IProductLogic } from '../../logic/product.interface';
import { isNullOrUndefined, ProductQueueMessage } from '@nodejs-microservices/utils';

export class Handler implements IHandler {
    private logic: IProductLogic;

    constructor(logic: IProductLogic) {
        this.logic = logic;
    }

    handle(message: ProductQueueMessage): void {
        try {
            if (isNullOrUndefined(message.emailToRemove)) {
                return;
            }

            const products: Product[] = this.logic.getByEmail(message.emailToRemove);
            for (const product of products) {
                this.logic.remove(product.id);
            }
        } catch (error) {
            // We are logging the error here to prevent it from being propagated and causing the application to crash
            console.error(error);
        }
    }
}
