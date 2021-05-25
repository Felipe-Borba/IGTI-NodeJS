import express from 'express';
import { promises as fs } from "fs";

const router = express.Router();

router.get('/maisModelos', async (req, res) => {
    try {
        const data = await getModelsFiltered('increasing');
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cant find that');
    }
});

router.get('/menosModelos', async (req, res) => {
    try {
        const data = await getModelsFiltered('decreasing');
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cant find that');
    }
});

router.get('/listaMaisModelos/:X', async (req, res) => {
    const filter = req.params.X;
    try {
        const data = await ReadJson('increasing');
        const dataFiltered = data.filter(item => item.models.length >= filter);
        const dataMapped = dataFiltered.map(item => {
            return `Marca ${item.brand} - ${item.models.length}`
        });

        res.send(dataMapped);
    } catch (error) {
        console.log(error);
        res.status(404).send('Sorry, cant find that');
    }
});

router.get('/listaMenosModelos/:X', (req, res) => {
    const filter = req.params.X;
    // TODO to be implemented
});

router.post('/listaModelos', (req, res) => {
    const brandName = req.body.nomeMarca;
    // TODO to be implemented
});

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