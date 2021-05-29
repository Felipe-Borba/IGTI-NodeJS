import orderRepository from "../repository/orderRepository.js";

async function createOrder(data) {
    const order = {
        cliente: data.cliente,
        produto: data.produto,
        valor: data.valor,
        entregue: false,
        timestamp: new Date()
    };

    return await orderRepository.insertItem(order);
}

async function updateOrder(data) {
    return await orderRepository.updateItem(data);
}

async function updateStatus(params) {
    return await orderRepository.updateEntregue(params);
}

async function deleteOrder(params) {
    return await orderRepository.deleteOrder(params.id);
}

async function getOrderById(params) {
    return await orderRepository.getOrderById(params.id);
}

export default {
    createOrder,
    updateOrder,
    updateStatus,
    deleteOrder,
    getOrderById
}