const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://tienhtvn:Tien2000@cluster0.tcyamxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let collection;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        const db = client.db();
        collection = db.collection('Cat');
        console.log("Connected to the database 123");
    } catch (ex) {
        console.error("Error connecting to the database:", ex);
    }
}
function getCollection() {
    if (!collection) {
        throw new Error("Collection is not initialized. Call runDBConnection first.");
    }
    return collection;
}
module.exports = { runDBConnection, getCollection };
