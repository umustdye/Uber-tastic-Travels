const express = require('express');
const UberParser = require('./uber_parser.js');
const fhvParser = require('./fhv_parser.js');
const Parser = require('./Noah_Parse.js');
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

//datasets
uber = UberParser.ParseUber();
fhv = fhvParser.Parsefhv();

//console.log(Parser.CompareBasedOnMonth());
compareDiplo = Parser.CompareBasedOnMonth(uber, fhv, "Diplo");


//public is name of html directory, basically website shtuff
server.use(express.static('public'));

server.use(bodyParser.json());

server.get('/pickup_date', function(req, res){
    res.send({ uber_date: uber.slice(1, 20)});
});

server.get('/compareDiplo', function(req, res){
    res.send({comparing: compareDiplo});
});

server.post('/search_results', function(req, res) {
    var results = [];
    var currLoc = req.body.address;
    console.log(req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, req.body.address);
    if (currLoc.length == 0) {
        currLoc = ' | ';
    }
    results = Parser.SearchByParameter(uber, fhv, req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, currLoc);
    console.log('Great Success!!');
    // console.log(results);
    if (results.length == 0) {
        results = [{"Date": 'No Data Available', "Time": 'No Data Available', "Address": 'No Data Available'}, {"Date": 'No Data Available', "Time": 'No Data Available', "Address": 'No Data Available'}];
    }
    // console.log(results);
    res.send(results);
});

