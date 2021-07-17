import express from 'express';
import orderRouter from './router/orderRouter.js';

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    console.log(`${req.method} http://localhost:8080${req.url}`);
    next();
});
app.use('/order', orderRouter);

app.listen(8080, () => console.log('Api started on port: 8080'));