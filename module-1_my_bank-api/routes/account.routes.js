import express from 'express';
import cors from 'cors';
import AccountController from '../controllers/account.controller.js';


const router = express.Router();

router.post(`/`, AccountController.createAccount);

router.get(`/`, cors(), AccountController.getAccounts);

router.get(`/:id`, AccountController.getAccount);

router.delete(`/:id`, AccountController.deleteAccount);

router.put(`/`, AccountController.updateAccount);

router.patch(`/updateBalance`, AccountController.updateBalance);

router.use((error, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl} - ${error}`);
    res.status(400).send(`error: ${error.message}`);
    //res.status(500).send('Sorry, something went wrong');
});

export default router;