const express = require('express');
const UberParser = require('./uber_parser.js');
const fhvParser = require('./fhv_parser.js');
const Noah = require('./Noah_Parse.js');
const cab_rides_parser = require('./cab_type_parse.js');
const Heidi = require('./busiest_time.js');
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
cab_rides = cab_rides_parser.ParseCab_Rides();
// console.log(cab_rides);

//console.log(Parser.CompareBasedOnMonth());
//compareDiplo = Noah.CompareBasedOnMonth(uber, fhv, "Diplo");
//Heidi.FindBusiestTime(uber, fhv, "Diplo");

//public is name of html directory, basically website shtuff
server.use(express.static('public'));

server.use(bodyParser.json());

server.get('/pickup_date', function(req, res){
    res.send({ uber_date: uber.slice(1, 20)});
});

server.get('/save_uber', function(req, res){
    UberParser.parseJSONToCSV(uber);
    res.send("Successfully saved Uber dataset to file...");
});

server.get('/save_fhv', function(req, res){
    fhvParser.parseJSONToCSV(fhv);
    res.send("Successfully saved fhv dataset to file...");
});

server.get('/compareDiplo', function(req, res){
    res.send({comparing: compareDiplo});
});

//get the busiest hours for pick ups
server.post('/busiest-times', function(req, res) {
    res.send('Showing Editable Things');
});

server.put('/find_busiest_time', function(req, res) {
    busiest_time = Heidi.FindBusiestTime(uber, fhv, req.body.Service);
    /*console.log("Busiest Time: ");
    busiest_time.forEach(hour => {
        console.log(hour)
    })*/
    res.send({Busiest_Time: busiest_time});
});

server.post('/search_results', function(req, res) {
    var results = [];
    var currLoc = req.body.address;
    console.log(req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, req.body.address, req.body.searchType);
    if (currLoc.length == 0) {
        currLoc = ' | ';
    }
    
    results = Noah.SearchByParameter(uber, fhv, req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, currLoc, req.body.searchType);
    console.log('Great Success!!');
    // console.log(results);
    if (results.length == 0) {
        results = [{"Date": 'No Data Available', "Time": 'No Data Available', "Address": 'No Data Available'}, {"Date": 'No Data Available', "Time": 'No Data Available', "Address": 'No Data Available'}];
    }
    // console.log(results);
    res.send(results);
});

//Add new ride
server.put('/add_fhv', function(req, res) {
    Noah.AddFHV(fhv, req.body.Service, req.body.Date, req.body.Time, req.body.Address);

    res.send('Ride Added Successfully');
});

server.put('/add_uber', function(req, res) {
    Noah.AddUber(uber, req.body.Date, req.body.Time, req.body.Longitude, req.body.Latitude, req.body.Base);

    res.send('Ride Added Successfully');
});

//Modify Existing Ride
server.put('/modify_fhv/:Identifier', function(req, res) {
    Noah.UpdateFHV(fhv, req.params.Identifier, req.body.Date, req.body.Time, req.body.Address);

    res.send('Ride Updated Successfully');
});

server.put('/modify_uber/:Identifier', function(req, res) {
    Noah.UpdateUber(uber, req.params.Identifier, req.body.Date, req.body.Time, req.body.Longitude, req.body.Latitude, req.body.Base);

    res.send('Ride Updated Successfully');
});

//Remove existing ride
server.delete('/delete_fhv/:Identifier', function(req, res) {
    Noah.RemoveFHV(fhv, req.params.Identifier);

    res.send('Ride Removed Successfully');
});

server.delete('/delete_uber/:Identifier', function(req, res) {
    Noah.RemoveUber(uber, req.params.Identifier);

    res.send('Ride Removed Successfully');
});

server.post('/add_fhv_ride', function(req, res) {
    res.send('Showing Editable Things');
});

server.post('/add_uber_ride', function(req, res) {
    res.send('Showing Editable Things');
});

//compare Uber to other riding services
server.post('/compare_results', function(req, res) {
    var results;
    console.log('Server', req.body.rideService1, req.body.rideService2, req.body.date);
    results = Noah.CompareBasedOnMonth(uber, fhv, req.body.rideService1, req.body.rideService2, req.body.date)
    console.log(results);
    res.send(results);
});

