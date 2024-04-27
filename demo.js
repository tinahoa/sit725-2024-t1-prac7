let express = require('express');
let app = express ();
let http = require('http').createServer(app);

let io = require('socket.io')(http);

var port = process.env.PORT || 3000; app.use(express.json());

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
const dbConnection = require('./dbConnection');
const router = require('./routers/router');


app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dbConnection.runDBConnection().then(() => {
    app.use(router);
    http.listen(3000,()=>{
        console.log('Listening on port 3000');
    
    })
    io.on('connection', (socket)=>{
        console.log('A user connected');
        socket.on('disconnect', ()=>{
            console.log('A user disconnected');
        });
        setInterval(()=>{
            socket.emit('number', parseInt(Math.random()*10));
        }, 1000); 
    });

}).catch(error => {
    console.error("Error starting the server:", error);
});
