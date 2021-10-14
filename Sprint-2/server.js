const express = require('express');
const UberParser = require('./uber_parser.js');
var bodyParser = require('body-parser');
const { application } = require('express');

const server = express();

const port = 3000;

server.listen(port, function(error) {
    if(error) {
        console.log("Something went wrong", error)
    } else {
        console.log("Server is listening on port " + port)
    }
})

//console.log(UberParser.ParseUber());

uber = UberParser.ParseUber();

//public is name of html directory, basically website shtuff
server.use(express.static('public'));

server.use(bodyParser.json());

server.get('/pickup_date', function(req, res){
    res.send({ uber_date: uber});
});

