import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    throw new Error('error test');
    
});

app.post('/', async(req, res, next) => {
    try {
        throw new Error('async error test');
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.log('error:');
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('some error happened');
});

app.listen(3000, () => {
    console.log('Server Started!');
});