import { promises } from 'fs';

const { readFile, writeFile } = promises;
const fileName = `./asset/pedidos.json`;
//const fileName = `module-1_challenge/asset/pedidos.json`; //TODO I way to fix file not found bud while debugging 

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

async function updateEntregue(params) {
    const data = JSON.parse(await readFile(fileName));
    const index = data.pedidos.findIndex(obj => obj.id == params.id);

    if (index === -1) {
        throw new Error(`order not found`);
    }

    data.pedidos[index].entregue = params.entregue;

    await writeFile(fileName, JSON.stringify(data, null, 2));

    return data.pedidos[index];
}

async function deleteOrder(id) {
    const data = JSON.parse(await readFile(fileName));
    data.pedidos = data.pedidos.filter(obj => obj.id != id);
    await writeFile(fileName, JSON.stringify(data, null, 2));
}

async function getOrderById(id) {
    const data = JSON.parse(await readFile(fileName));
    const index = data.pedidos.findIndex(obj => obj.id == id);

    if (index === -1) {
        throw new Error(`order not found`);
    }

    return data.pedidos[index];
}

async function getOrder() {
    const data = JSON.parse(await readFile(fileName));
    return data.pedidos;
}

async function ListMaisVendido() {
    let orderList = await getOrder();
    orderList = orderList.filter(order => order.entregue != false);
    const produtoList = [{
        produto: orderList[0].produto,
        quantidade: 0
    }];

    orderList.forEach(order => {
        const index = produtoList.findIndex(item => item.produto === order.produto);
        if (index === -1) {
            produtoList.push({
                produto: order.produto,
                quantidade: 1
            });
        } else {
            produtoList[index].quantidade++;
        }
    });

    return produtoList;
}

export default {
    insertItem,
    updateItem,
    updateEntregue,
    deleteOrder,
    getOrderById,
    getOrder,
    ListMaisVendido
}