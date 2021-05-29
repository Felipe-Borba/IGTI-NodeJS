import express from 'express';
import orderController from '../controller/orderController.js';


const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.put('/', orderController.updateOrder);
orderRouter.patch('/', orderController.updateOrderStatus);

orderRouter.use((error, req, res, next) => {
    console.log(error);
    res.status(400).send(`error: ${error.message}`);
});

export default orderRouter;