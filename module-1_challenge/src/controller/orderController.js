import orderService from "../service/orderService.js";

async function createOrder(req, res, next) {
    try {
        const inputData = {
            cliente: req.body.cliente,
            produto: req.body.produto,
            valor: req.body.valor
        };

        if (typeof (inputData.cliente) != 'string' || typeof (inputData.produto) != 'string') {
            throw new Error(`
                input data should be:
                {
                    cliente: String,
                    produto: String,
                    valor: Number
                }
            `);
        }

        if (!parseFloat(inputData.valor)) {
            throw new Error('valor should be a number');
        }
        inputData.valor = parseFloat(inputData.valor);
        

        const order = await orderService.createOrder(inputData);

        res.send(order);  
             
    } catch (error) {
        next(error);
    }
}

export default {
    createOrder
}