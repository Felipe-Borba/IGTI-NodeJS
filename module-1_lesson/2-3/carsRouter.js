import express from "express";

const router = express.Router();

router.get('/', (req, res)=>{
    console.log(`get cars`);
    res.end();
});

router.get('/price', (req, res)=>{
    console.log(`get cars price`);
    res.end();
});

export default router;
