// const { getCards, submitForm } = require('./../models/cat');
import { getCards, submitForm } from './../models/cat';

async function getCardsController(req, res) {
    try {

        let cardList = await getCards();
        res.json({ statusCode: 200, cards: cardList, message: "Success" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}

async function submitFormController(req, res) {
    const { title, image, description } = req.body;
    try {
        const result = await submitForm(title, image, description);
        res.json(result);
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
}

module.exports = {getCardsController, submitFormController};
