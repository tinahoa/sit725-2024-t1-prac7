const { getCollection } = require('../dbConnection');

// import { getCollection } from '../dbConnection';

async function getCards() {
    try {
        const collection = getCollection();
        const cards = await collection.find().toArray();
        return cards;
    } catch (ex) {
        console.error("Error fetching cards:", ex);
        return [];
    }
}

async function submitForm(title, image, description) {
    try {
        await collection.insertOne({ title, image, description });
        console.log("Form submitted successfully");
        return { statusCode: 200, message: "Form submitted successfully" };
    } catch (error) {
        console.error("Error submitting form:", error);
        throw new Error("Internal Server Error");
    }
}

module.exports = { getCards, submitForm };
