import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { IProductDal } from '../dal';
import { IProductLogic } from './product.interface';

export class ProductLogic implements IProductLogic {
    private dal: IProductDal;

    constructor(dal: IProductDal) {
        this.dal = dal;
    }

    get(id: string): Product {
        return this.dal.get(id);
    }

    getByEmail(email: string): Product[] {
        return this.dal.getByEmail(email);
    }

    add(email: string, name: string, description: string, price: number): Product {
        const product: Product = { id: uuidv4(), userEmail: email, name, description, price };
        this.dal.add(product);
        return product;
    }

    remove(id: string): void {
        this.dal.remove(id);
    }
}
