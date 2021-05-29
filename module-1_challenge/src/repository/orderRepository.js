import { promises } from 'fs';

const { readFile, writeFile } = promises;
const fileName = `asset/pedidos.json`;

async function insertItem(item) {
    const data = JSON.parse(await readFile(fileName));

    item = {
        id: data.nextId++,
        ...item
    };
    data.pedidos.push(item);

    await writeFile(fileName, JSON.stringify(data, null, 2));

    return item;
}

async function updateItem(item) {
    const data = JSON.parse(await readFile(fileName));
    const index = data.pedidos.findIndex(obj => obj.id == item.id);

    if (index === -1) {
        throw new Error(`order not found`);
    }

    data.pedidos[index].cliente = item.cliente;
    data.pedidos[index].produto = item.produto;
    data.pedidos[index].valor = item.valor;
    data.pedidos[index].entregue = item.entregue;

    await writeFile(fileName, JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

export default {
    insertItem,
    updateItem
}