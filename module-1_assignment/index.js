import express from 'express';
import brandRouter from './brandRouter.js';

const app = express();
app.use(express.json());

app.use('/marcas', brandRouter);

app.listen(8080, () => {
    console.log('Server Started!');
});