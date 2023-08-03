import { Handler, IHandler } from '../queue-message';
import { IPaymentDal, PaymentDal } from '../dal';
import { IPaymentLogic, PaymentLogic } from '../logic';
import { PaymentRoute } from '../routes/payment';
import { IPaymentRoute } from '../routes/payment.interface';

export class Factory {
    static getRouteInstance(): IPaymentRoute {
        return new PaymentRoute(Factory.getLogicInstance());
    }

    static getLogicInstance(): IPaymentLogic {
        return new PaymentLogic(Factory.getDalInstance());
    }

    static getDalInstance(): IPaymentDal {
        return new PaymentDal();
    }

    static getHandlerInstance(): IHandler {
        return new Handler(Factory.getLogicInstance());
    }
}

// perhaps this can be reused by putting it in the libs as a common module
