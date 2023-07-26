import { Product } from '../types';

export interface IProductDal {
    get(id: string): Product;
    getByEmail(email: string): Product[];
    add(product: Product): void;
    remove(id: string): void;
}
