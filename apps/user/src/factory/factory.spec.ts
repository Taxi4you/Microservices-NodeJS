import { Factory } from './factory';
import { UserDal } from '../dal/user';
import { UserLogic } from '../logic/user';
import { UserRoute } from '../routes/user';

describe('Factory', () => {
    it('should return an instance of UserRoute', () => {
        expect(Factory.getRouteInstance()).toBeInstanceOf(UserRoute);
    });

    it('should return an instance of UserLogic', () => {
        expect(Factory.getLogicInstance()).toBeInstanceOf(UserLogic);
    });

    it('should return an instance of UserDal', () => {
        expect(Factory.getDalInstance()).toBeInstanceOf(UserDal);
    });
});
