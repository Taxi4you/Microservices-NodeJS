import { Factory } from './factory';
import { ShopLogic } from '../logic';
import { ShopRoute } from '../routes/shop';

describe('Factory', () => {
    it('should return an instance of ShopRoute', () => {
        expect(Factory.getRouteInstance()).toBeInstanceOf(ShopRoute);
    });

    it('should return an instance of ShopLogic', () => {
        expect(Factory.getLogicInstance()).toBeInstanceOf(ShopLogic);
    });
});
