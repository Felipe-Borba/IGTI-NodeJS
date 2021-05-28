import express from 'express';
import orderRouter from './router/orderRouter.js';

const app = express();
app.use(express.json());
app.use('/order', orderRouter);

app.listen(8080, () => console.log('Api Started!'));