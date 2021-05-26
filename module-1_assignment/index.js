import express from 'express';
import brandRouter from './brandRouter.js';

const app = express();
app.use(express.json());

app.use('/marcas', brandRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Sorry, something went wrong');
});

app.listen(8080, () => console.log('Server Started!'));