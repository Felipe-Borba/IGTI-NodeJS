
async function createOrder(req, res, next) {
    try {
        // TODO verify fields: cliente, produto, valor
        const order = {
            cliente: req.body.cliente,
            produto: req.body.produto,
            valor: req.body.valor
        };
        if (typeof (order.cliente) != 'string' || typeof (order.produto)!= 'string' || typeof (order.valor) != 'number') {
            throw new Error(`
                input data should be:
                {
                    cliente: String,
                    produto: String,
                    valor: Number
                }
            `);
        }
        // TODO send to service

        // TODO return whatever happened 
        res.send(order);
    } catch (error) {
        next(error);
    }
}

export default {
    createOrder
}