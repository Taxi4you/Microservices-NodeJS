import { Handler, IHandler } from '../queue-message';
import { IProductDal, ProductDal } from '../dal';
import { IProductLogic, ProductLogic } from '../logic';
import { ProductRoute } from '../routes/product';
import { IProductRoute } from '../routes/product.interface';

export class Factory {
    static getRouteInstance(): IProductRoute {
        return new ProductRoute(Factory.getLogicInstance());
    }

    static getLogicInstance(): IProductLogic {
        return new ProductLogic(Factory.getDalInstance());
    }

    static getDalInstance(): IProductDal {
        return new ProductDal();
    }

    static getHandlerInstance(): IHandler {
        return new Handler(Factory.getLogicInstance());
    }
}
