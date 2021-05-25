import express from 'express';
import { promises as fs } from "fs";

const router = express.Router();

router.get('/maisModelos', async (req, res) => {
    try {
        const data = await getModelsFiltered('increasing');
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.get('/menosModelos', async (req, res) => {
    try {
        const data = await getModelsFiltered('decreasing');
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.get('/listaMaisModelos/:X', async (req, res) => {
    try {
        const filter = req.params.X;
        const data = await ReadJson('increasing');
        const dataFiltered = data.filter(item => item.models.length >= filter);
        const dataMapped = dataFiltered.map(item => `Marca ${item.brand} - ${item.models.length}`);

        res.send(dataMapped);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.get('/listaMenosModelos/:X', async (req, res) => {
    try {
        const filter = req.params.X;
        const data = await ReadJson('decreasing');
        const dataFiltered = data.filter(item => item.models.length <= filter);
        const dataMapped = dataFiltered.map(item => `Marca ${item.brand} - ${item.models.length}`);

        res.send(dataMapped);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

router.post('/listaModelos', async (req, res) => {
    try {
        const brandName = req.body.nomeMarca.toLowerCase().capitalize();
        const data = JSON.parse(await fs.readFile('asset/car-list.json'));
        const findData = data.find(item => item.brand == brandName);
        res.send(findData ? findData.models : []);
    } catch (error) {
        console.log(error);
        res.status(500).send('Sorry, something went wrong');
    }
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

async function getModelsFiltered(moreLess) {

    const data = await ReadJson(moreLess);

    const dataFiltered = data.filter((item) => {
        return item.models.length === data[0].models.length;
    });

    const dataMapped = dataFiltered.map(item => item.brand);
    return dataMapped;
}

async function ReadJson(order) {
    let filter = 0;
    const data = JSON.parse(await fs.readFile('asset/car-list.json'));

    if (order === 'increasing') {
        filter = 1;
    }
    if (order === 'decreasing') {
        filter = -1;
    }

    data.sort((a, b) => {
        if (a.models.length == b.models.length)
            return 0;
        if (a.models.length < b.models.length)
            return (filter);
        if (a.models.length > b.models.length)
            return ((-1) * filter);
    });
    return data;
}

export default router;