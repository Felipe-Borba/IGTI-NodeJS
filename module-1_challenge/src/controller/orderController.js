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

async function updateOrder(req, res, next) {
    try {
        const inputData = {
            id: req.body.id,
            cliente: req.body.cliente,
            produto: req.body.produto,
            valor: req.body.valor,
            entregue: req.body.entregue,
        };

        if (typeof (inputData.id) != 'number' ||
            typeof (inputData.cliente) != 'string' ||
            typeof (inputData.produto) != 'string' ||
            typeof (inputData.entregue) != 'boolean') {
            throw new Error(`
                input data should be:
                {
                    id: Number,
                    cliente: String,
                    produto: String,
                    valor: Number,
                    entregue: Boolean
                }
            `);
        }

        if (!parseFloat(inputData.valor)) {
            throw new Error('valor should be a number');
        }
        inputData.valor = parseFloat(inputData.valor);


        const order = await orderService.updateOrder(inputData);


        res.send(order);
    } catch (error) {
        next(error);
    }
}

async function updateOrderStatus(req, res, next) {
    try {
        const inputData = {
            id: req.body.id,
            entregue: req.body.entregue,
        };

        if (typeof (inputData.id) != 'number' ||
            typeof (inputData.entregue) != 'boolean') {
            throw new Error(`
                input data should be:
                {
                    id: Number,
                    entregue: Boolean
                }
            `);
        }


        await orderService.updateStatus(inputData);


        res.end();
    } catch (error) {
        next(error);
    }
}

async function deleteOrder(req, res, next) {
    try {
        const inputData = {
            id: req.body.id
        };

        if (typeof (inputData.id) != 'number') {
            throw new Error(`
                input data should be:
                {
                    id: Number
                }
            `);
        }

        await orderService.deleteOrder(inputData);

        res.end();
    } catch (error) {
        next(error);
    }
}

async function getOrder(req, res, next) {
    try {
        const inputData = {
            id: parseInt(req.params.id)
        }
        res.send(await orderService.getOrderById(inputData));
    } catch (error) {
        next(error);
    }
}

async function totalValor(req, res, next) {
    try {
        const inputData = {
            cliente: req.body.cliente
        }

        if (typeof (inputData.cliente) != 'string') {
            throw new Error(`
                input data should be:
                {
                    cliente: string
                }
            `);
        }

        res.send({ total: await orderService.getTotalValor(inputData) });
    } catch (error) {
        next(error);
    }
}


async function getTotalPedido(req, res, next) {
    try {
        const inputData = {
            produto: req.body.produto
        }

        if (typeof (inputData.produto) != 'string') {
            throw new Error(`
                input data should be:
                {
                    produto: string
                }
            `);
        }

        res.send({ total: await orderService.getTotalProduto(inputData) });
    } catch (error) {
        next(error);
    }
}

async function maisVendido(req, res, next) {
    try {
        res.send(await orderService.listMaisVendido());
    } catch (error) {
        next(error);
    }
}

export default {
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrder,
    totalValor,
    getTotalPedido,
    maisVendido
}