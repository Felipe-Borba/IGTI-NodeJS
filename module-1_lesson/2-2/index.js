import express from 'express';

const app = express();
app.use(express.json());

// All
app.all('/', (req, res) => {
    res.send(`hello: ${req.method}`);
});

// special Characters
app.get('/test?', (req, res) => {
    res.send('last character \'t\' is optional');
});

app.get('/buz+', (req, res) => {
    res.send('alow to repeat \'z\' character any time you want');
});

app.get('/one*Blue', (req, res) => {
    res.send(`alow to insert any thing in \'*\' position \n ${req.path}`);
});

app.post('/test(ing)?', (req, res) => {
    res.send(`brackets make as if it was one character, so adding \'?\' at the and makes \'ing\' optional\n ${req.path}`);
});

//regular expression
app.get(/.*Red$/, (req, res) => {
    res.send(`this is a regular expression \n ${req.path}`);
});

//params
app.post('/body?', (req, res) => {
    console.log(req.body);
    res.send(`body logged`);
});

app.get('/param/:id/:name?', (req, res) => {
    res.send(`send with variable called \'id\' and \'name\' in route, but \'name\' is optional \n ${req.params.id}, ${req.params.name}`);
});

//query params
app.get('/query/', (req, res) => {
    res.send(`response of query: \n${JSON.stringify(req.query)}`);
});

//next
app.get('/next', (req, res, next) => {
    console.log('callback 1');
    next();
}, (req, res) => {
    console.log('callback 2');
    res.end();
});

const callback1 = (req, res, next) => {
    console.log('callback 1');
    next();
};
function callback2(req, res, next) {
    console.log('callback 2');
    res.end();
    next();
};
const callback3 = (req, res, next) => {
    console.log('callback 3');
};
app.get('/arrayNext', [callback1, callback2, callback3]);


app.listen(3000, () => {
    console.log('API Started!');
});