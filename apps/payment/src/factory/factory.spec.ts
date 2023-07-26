import { Factory } from './factory';
import { PaymentDal } from '../dal';
import { PaymentLogic } from '../logic';
import { PaymentRoute } from '../routes';
import { Handler } from '../queue-message';

describe('Factory', () => {
    it('should return an instance of PaymentRoute', () => {
        expect(Factory.getRouteInstance()).toBeInstanceOf(PaymentRoute);
    });

    it('should return an instance of PaymentLogic', () => {
        expect(Factory.getLogicInstance()).toBeInstanceOf(PaymentLogic);
    });

    it('should return an instance of PaymentDal', () => {
        expect(Factory.getDalInstance()).toBeInstanceOf(PaymentDal);
    });

    it('should return an instance of Handler', () => {
        expect(Factory.getHandlerInstance()).toBeInstanceOf(Handler);
    });
});
