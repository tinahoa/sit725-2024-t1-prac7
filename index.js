const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const dbConnection = require('./dbConnection');
const router = require('./routers/router');

app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection.runDBConnection().then(() => {

    app.use(router);

    let PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Listening on " + PORT);
    });
}).catch(error => {
    console.error("Error starting the server:", error);
});