import express from 'express';
import { promises as fs } from "fs";

const { readFile } = fs;
const router = express.Router();

//! In this case should have some performance improvement if implemented using only one for loop
router.get('/maisModelos', async (req, res, next) => {
    try {
        const data = await getModelsFiltered('increasing');
        res.send(data); //TODO case data have only one item should not return an array with one element (possible fix: using ternary)
    } catch (error) {
        next(error);
    }
});

router.get('/menosModelos', async (req, res, next) => {
    try {
        const data = await getModelsFiltered('decreasing');
        res.send(data);
    } catch (error) {
        next(error);
    }
});

router.get('/listaMaisModelos/:X', async (req, res, next) => {
    try {
        const filter = req.params.X;
        const data = await listBrands(filter, 'increasing');

        res.send(data);
    } catch (error) {
        next(error);
    }
});

router.get('/listaMenosModelos/:X', async (req, res, next) => {
    try {
        const filter = req.params.X;
        const data = await listBrands(filter, 'decreasing');

        res.send(data);
    } catch (error) {
        next(error);
    }
});

//* It's possible to get rid of capitalize function by setting everything to uppercase inside find function
router.post('/listaModelos', async (req, res, next) => {
    try {
        const brandName = req.body.nomeMarca.toLowerCase().capitalize();
        const data = JSON.parse(await readFile('asset/car-list.json'));
        const findData = data.find(item => item.brand == brandName);
        res.send(findData ? findData.models : []);
    } catch (error) {
        next(error);
    }
});


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

async function listBrands(filter, sort) {
    const data = await ReadJson(sort);
    const dataFiltered = data.filter((item, n) => n <= filter - 1);
    const dataMapped = dataFiltered.map(item => `Marca ${item.brand} - ${item.models.length}`);
    return dataMapped;
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
    const data = JSON.parse(await readFile('asset/car-list.json'));

    if (order === 'increasing') {
        filter = 1;
    }
    if (order === 'decreasing') {
        filter = -1;
    }

    data.sort((a, b) => {
        if (a.models.length == b.models.length) {
            return a.brand.localeCompare(b.brand);
        }
        if (a.models.length < b.models.length) {
            return (filter);
        }
        if (a.models.length > b.models.length) {
            return ((-1) * filter);
        }
    });
    return data;
}

export default router;