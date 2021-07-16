import express from 'express';

const app = express();
app.use(express.json());

app.use(express.static('2-6/public')); //http://localhost:3000/neko.jpg
app.use('/images', express.static('2-6/public')); //http://localhost:3000/images/neko.jpg

app.listen(3000, () => {
    console.log('Server Started!');
});