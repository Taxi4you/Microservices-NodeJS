import express from 'express';
import { Factory } from '../factory';
import { IProductRoute } from './product.interface';
import { validateTokenAndSetUserInfoMiddleware } from '@nodejs-microservices/utils';

const router = express.Router({ mergeParams: true });

router.use(validateTokenAndSetUserInfoMiddleware);

const productRoute: IProductRoute = Factory.getRouteInstance();
router.get('/get-by-id/:id', productRoute.getById.bind(productRoute));
router.get('/get-by-email/:email', productRoute.getByEmail.bind(productRoute));
router.post('/add', productRoute.add.bind(productRoute));

export { router };
