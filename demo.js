// let express = require("express");
import express from "express"; 
let app = express();
import http from 'http';

const server = http.createServer(app); 

import { Server } from 'socket.io'; 

const io = new Server(http); 

var port = process.env.PORT || 8080; app.use(express.json());

app.get("/test", function (request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!"); 
});
app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){ var firstNumber = parseInt(req.params.firstNumber)
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) } 

});



import { MongoClient, ServerApiVersion } from 'mongodb';



const router = express.Router();
import {router} from './routers/router';
import {runDBConnection, getCollection} from './controllers/controller';

runDBConnection().then(() => {

    app.use(router);

    let PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Listening on " + PORT);
    });


//socket test
    io.on('connection', (socket) => { console.log('a user connected'); socket.on('disconnect', () => {
        console.log('user disconnected'); });
        setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
        }, 1000); });
    server.listen(port,()=>{

    console.log("Listening on port ", port); 

    });

}).catch(error => {
    console.error("Error starting the server:", error);
});

