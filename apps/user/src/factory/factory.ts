import { IUserDal, UserDal } from '../dal';
import { IUserLogic, UserLogic } from '../logic';
import { UserRoute } from '../routes/user';
import { IUserRoute } from '../routes/user.interface';

export class Factory {
    static getRouteInstance(): IUserRoute {
        return new UserRoute(Factory.getLogicInstance());
    }

    static getLogicInstance(): IUserLogic {
        return new UserLogic(Factory.getDalInstance());
    }

    static getDalInstance(): IUserDal {
        return new UserDal();
    }
}
