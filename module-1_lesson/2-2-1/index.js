import express from 'express';

const app = express();

app.all('/', (req, res) => {
    res.send(`hello: ${req.method}`);
});

app.get('/test?', (req, res) => {
    res.send('last character \'t\' is optional');
});

app.get('/buz+', (req, res) => {
    res.send('alow to repeat \'z\' character any time you want');
});

app.listen(3000, () => {
    console.log('API Started!');
});