import express from 'express';
import { Factory } from '../factory';
import { IPaymentRoute } from './payment.interface';
import { validateTokenAndSetUserInfoMiddleware } from '@nodejs-microservices/utils';

const router = express.Router({ mergeParams: true });

router.use(validateTokenAndSetUserInfoMiddleware);

const paymentRoute: IPaymentRoute = Factory.getRouteInstance();
router.get('/get-by-id/:id', paymentRoute.getById.bind(paymentRoute));
router.get('/get-by-email/:email', paymentRoute.getByEmail.bind(paymentRoute));
router.post('/add', paymentRoute.add.bind(paymentRoute));

export { router };
