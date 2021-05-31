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

async function getTotalValor(params) {
    let total = 0;
    let orderList = await orderRepository.getOrder();

    orderList = orderList.filter(order => order.cliente === params.cliente);
    orderList = orderList.filter(order => order.entregue === true);

    orderList.forEach(order => {
        total += order.valor;
    });
    return total;
}

async function getTotalProduto(params) {
    let totalPedidos = 0;
    let orderList = await orderRepository.getOrder();

    orderList = orderList.filter(order => order.produto != params.produto);
    orderList = orderList.filter(order => order.entregue === true);
    orderList.forEach(order => totalPedidos++);

    return totalPedidos;
}

async function listMaisVendido() {
    const produtoList = await orderRepository.ListMaisVendido();
    const produtoArray = [];
    produtoList.forEach(pedido => {
        produtoArray.push(`${pedido.produto} - ${pedido.quantidade}`);
    });
    
    return produtoArray
}

export default {
    createOrder,
    updateOrder,
    updateStatus,
    deleteOrder,
    getOrderById,
    getTotalValor,
    getTotalProduto,
    listMaisVendido
}