import { Product } from '../types';

export interface IProductLogic {
    get(id: string): Product;
    getByEmail(email: string): Product[];
    add(email: string, name: string, description: string, price: number): Product;
    remove(id: string): void;
}
