import express from 'express';

const app = express();
app.use(express.json());
app.use(express.static(`public`));

app.listen(8081, () => {
    
    console.log(`Api Started on port: 8081`);
});

/* *
 * To test Cors start this api and my bank api a the same time and access http://localhost:8081/index.html 
 * open the console to verify CORS error
 */