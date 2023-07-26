import express from 'express';
import { Factory } from '../factory';
import { validateTokenAndSetUserInfoMiddleware } from '@nodejs-microservices/utils';
import { IShopRoute } from './shop.interface';

const router = express.Router({ mergeParams: true });

const shopRoute: IShopRoute = Factory.getRouteInstance();
router.use(validateTokenAndSetUserInfoMiddleware);
router.post('/remove-user-data', shopRoute.removeUserData.bind(shopRoute));
router.post('/add-sample-data', shopRoute.addSampleData.bind(shopRoute));
router.get('/get-all-user-data', shopRoute.getAllUserData.bind(shopRoute));

export { router };
