import cors from 'cors';
import express from 'express';
import { router } from './routes';
import { registerMessageQueues } from './queue-message';
import { apiErrorHandler } from '@nodejs-microservices/utils';

registerMessageQueues();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.use(apiErrorHandler);

const host = process.env.PAYMENT_SERVICE_HOST;
const port = Number(process.env.PAYMENT_SERVICE_PORT);
app.listen(port, host, () => {
    console.log(`Service is ready and running on path: http://${host}:${port}`);
});

// consider export app individually so you can use it later for tests using Jest with Supertest or something.
// For example, create a file /bin/app.ts and export just the app.

// also, get the returned server object from the app.listen method.
// This can be used to handle gracefull shutdown when SIGTERM events are received.
// This is extremley crucial. 
