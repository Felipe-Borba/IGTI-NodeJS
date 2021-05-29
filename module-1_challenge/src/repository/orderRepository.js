import { promises } from 'fs';

const { readFile, writeFile } = promises;
const fileName = `asset/pedidos.json`;

async function insertOrder(order) {
    // TODO push in json
    const data = JSON.parse(await readFile(fileName));

    order = {
        id: data.nextId++,
        cliente: order.cliente,
        produto: order.produto,
        valor: order.valor,
        entregue: order.entregue,
        timestamp: order.timestamp
    };
    data.pedidos.push(order);

    await writeFile(fileName, JSON.stringify(data, null, 2));

    return order;
}

export default {
    insertOrder
}