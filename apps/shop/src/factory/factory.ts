import { IShopLogic, ShopLogic } from '../logic';
import { ShopRoute } from '../routes/shop';
import { IShopRoute } from '../routes/shop.interface';

export class Factory {
    static getRouteInstance(): IShopRoute {
        return new ShopRoute(Factory.getLogicInstance());
    }

    static getLogicInstance(): IShopLogic {
        return new ShopLogic();
    }
}
