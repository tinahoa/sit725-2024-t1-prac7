const express = require('express');
const router = express.Router();
// const { getCardsController, submitFormController } = require('./../controllers/controller');
import {getCardsController,submitFormController } from './../controllers/controller';

router.get('/api/cards', getCardsController);
router.post('/api/submitForm', submitFormController);

export default {
    router
};