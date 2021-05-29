import orderRepository from "../repository/orderRepository.js";

async function createOrder(order) {
    const data = {
        ...order,
        entregue: false,
        timestamp: new Date()
    };
    
    return await orderRepository.insertOrder(data); 
}

export default {
    createOrder
}