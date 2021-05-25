import express from 'express';

const router = express.Router();

router.get('/maisModelos', (req, res) => {
    // TODO to be implemented
});

router.get('/menosModelos', (req, res) => {
    // TODO to be implemented
});

router.get('/listaMaisModelos/:X', (req, res) => {
    const filter = req.params.x;
    // TODO to be implemented
});

router.get('/listaMenosModelos/:X', (req, res) => {
    const filter = req.params.x;
    // TODO to be implemented
});

router.post('/listaModelos', (req, res) => {
    const brandName = req.body.nomeMarca;
    // TODO to be implemented
});

export default router;