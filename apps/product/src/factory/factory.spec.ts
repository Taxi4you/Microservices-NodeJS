import { Factory } from './factory';
import { ProductDal } from '../dal';
import { ProductLogic } from '../logic';
import { ProductRoute } from '../routes';
import { Handler } from '../queue-message';

describe('Factory', () => {
    it('should return an instance of ProductRoute', () => {
        expect(Factory.getRouteInstance()).toBeInstanceOf(ProductRoute);
    });

    it('should return an instance of ProductLogic', () => {
        expect(Factory.getLogicInstance()).toBeInstanceOf(ProductLogic);
    });

    it('should return an instance of ProductDal', () => {
        expect(Factory.getDalInstance()).toBeInstanceOf(ProductDal);
    });

    it('should return an instance of Handler', () => {
        expect(Factory.getHandlerInstance()).toBeInstanceOf(Handler);
    });
});
