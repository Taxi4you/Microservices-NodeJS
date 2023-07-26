import { Product } from '../types';
import { IProductDal } from './product.interface';

const products: Product[] = [];

export class ProductDal implements IProductDal {
    get(id: string): Product {
        return products.find((p: Product) => p.id === id);
    }

    getByEmail(email: string): Product[] {
        return products.filter((p: Product) => p.userEmail === email);
    }

    add(product: Product): void {
        products.push(product);
    }

    remove(id: string): void {
        const index = products.findIndex((p: Product) => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);
        }
    }
}
