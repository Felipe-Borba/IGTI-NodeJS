import express from 'express';
import orderController from '../controller/orderController.js';


const orderRouter = express.Router();

orderRouter.post('/', orderController.createOrder);
orderRouter.put('/', orderController.updateOrder);
orderRouter.patch('/', orderController.updateOrderStatus);
orderRouter.delete('/', orderController.deleteOrder);
orderRouter.get('/:id', orderController.getOrder);
orderRouter.get('/valor/cliente', orderController.totalValor);
orderRouter.get('/total/pedido', orderController.getTotalPedido);
orderRouter.get('/mais/vendido', orderController.maisVendido);

orderRouter.use((error, req, res, next) => {
    console.log(error);
    res.status(400).send(`error: ${error.message}`);
});

export default orderRouter;