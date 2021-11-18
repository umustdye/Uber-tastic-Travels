const express = require('express');
const UberParser = require('./uber_parser.js');
const fhvParser = require('./fhv_parser.js');
const Noah = require('./Noah_Parse.js');
const cab_rides_parser = require('./cab_type_parse.js');
const Bao = require('./Bao_dataAnalytics.js');
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
// cab_rides_parser.parseJSONToCSV(cab_rides);

// console.log(cab_rides);
//console.log(Bao.cab_type(cab_rides));
//console.log(Bao.cab_price(cab_rides));
//console.log(Bao.popular_destination_boston(cab_rides));
//console.log(Bao.popular_routes(cab_rides));
//Heidi.FindBusiestTime(uber, fhv, "Diplo");

//Incremental implemenation for compare based on month
var uber_rides_modified = false
var uber_rides_updates = []
var fhv_rides_modified = false
var fhv_rides_updates = []
Noah.updateUberCompareCount(uber, 0, 0);
Noah.updateFHVCompareCount(fhv, 0, 0, 'all');

//Incremental implementation for cab_price
cab_rides_removed = false;
cab_rides_added = false;
cab_rides_updates = []
Bao.cab_price_calc(cab_rides);

//public is name of html directory, basically website shtuff
server.use(express.static('public'));

server.use(bodyParser.json());

server.get('/pickup_date', function(req, res){
    res.send({ uber_date: uber.slice(1, 20)});
});
//Bao's Analytics
server.get('/cab_type', function(req, res)
{
    cab_type = Bao.cab_type(cab_rides);
    res.send({cab_type, cab_type});
});

server.get('/cab_price', function(req, res)
{
    if (cab_rides_added && !cab_rides_removed) {
        for (let i = 0; i < cab_rides_updates.length; i++) {
            Bao.cab_price_add(cab_rides_updates[i].name, cab_rides_updates[i].price, cab_rides_updates[i].distance, cab_rides_updates[i].cab_type)
        }
        cab_rides_added = false;
    }
    if (cab_rides_removed) {
        Bao.cab_price_calc(cab_rides)
        cab_rides_removed = false;

        if (cab_rides_added) {
            cab_rides_added = false;
        }
    }
    cab_price = Bao.cab_price(/*cab_rides*/);
    res.send({cab_price, cab_price});
});

server.get('/popular_destination_boston', function(req, res)
{
    popular_destination_boston = Bao.popular_destination_boston(cab_rides);
    res.send({popular_destination_boston, popular_destination_boston});
});

server.get('/popular_routes', function(req, res)
{
    popular_routes = Bao.popular_routes(cab_rides);
    res.send({popular_routes, popular_routes});
});

server.get('/save_uber', function(req, res){
    UberParser.parseJSONToCSV(uber);
    res.send("Successfully saved Uber dataset to file...");
});

server.get('/save_fhv', function(req, res){
    fhvParser.parseJSONToCSV(fhv);
    res.send("Successfully saved fhv dataset to file...");
});

server.get('/save_lyft', function(req, res){
    cab_rides_parser.parseJSONToCSV(cab_rides);
    res.send("Successfully saved cab dataset to file...");
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
    console.log(req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, req.body.address, req.body.source, req.body.destination, req.body.lyftType, req.body.searchType);
    if (currLoc.length == 0) {
        currLoc = "|NO|DATA|SUPPLIED|";
    }
    console.log(currLoc)
    if(req.body.rideService.includes('Uber')) {
        results = Noah.SearchByParameter(uber, req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, currLoc, req.body.source, req.body.destination, req.body.lyftType, req.body.searchType);
    }
    else if(req.body.rideService.includes('Lyft')) {
        results = Noah.SearchByParameter(cab_rides, req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, currLoc, req.body.source, req.body.destination, req.body.lyftType, req.body.searchType);
    }
    else {
        results = Noah.SearchByParameter(fhv, req.body.rideService, req.body.dateBegin, req.body.dateEnd, req.body.timeBegin, req.body.timeEnd, currLoc, req.body.source, req.body.destination, req.body.lyftType, req.body.searchType);
    }
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
    // Noah.updateFHVCompareCount(fhv, 1, req.body.Date[6], req.body.Service);
    fhv_rides_modified = true
    fhv_rides_updates.push({'service': req.body.Service, 'action': 'add', 'month': req.body.Date[6]})

    res.send('Ride Added Successfully');
});

server.put('/add_uber', function(req, res) {
    Noah.AddUber(uber, req.body.Date, req.body.Time, req.body.Longitude, req.body.Latitude, req.body.Base);
    // Noah.updateUberCompareCount(uber, 1, req.body.Date[6]);
    uber_rides_modified = true
    uber_rides_updates.push({'service': 'Uber', 'action': 'add', 'month': req.body.Date[6]})
    res.send('Ride Added Successfully');
});

server.put('/add_lyft', function(req, res) {
    console.log(req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance)
    Noah.AddLyft(cab_rides, req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance);
    
    cab_rides_added = true;
    cab_rides_updates.push({'type': 'Lyft', 'price': req.body.Price, 'distance': req.body.Distance, 'name': req.body.LyftType})
    
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

server.put('/modify_lyft/:Identifier', function(req, res) {
    console.log(req.params.Identifier, req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance)
    Noah.UpdateLyft(cab_rides, req.params.Identifier, req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance);
    
    res.send('Ride Updated Successfully');
    
});

//Remove existing ride
server.delete('/delete_fhv/:Identifier', function(req, res) {
    ride = Noah.findByIdentifier(fhv, 'Other', req.params.Identifier)
    // Noah.updateFHVCompareCount(fhv, -1, ride.Month, ride.Name);
    fhv_rides_modified = true
    fhv_rides_updates.push({'service': ride.Name, 'action': 'delete', 'month': ride.Month})
    Noah.RemoveFHV(fhv, req.params.Identifier);

    res.send('Ride Removed Successfully');
});

server.delete('/delete_uber/:Identifier', function(req, res) {
    ride = Noah.findByIdentifier(uber, 'Uber', req.params.Identifier)
    // Noah.updateUberCompareCount(uber, -1, ride.Month);
    uber_rides_modified = true
    uber_rides_updates.push({'service': 'Uber', 'action': 'delete', 'month': ride.Month})
    Noah.RemoveUber(uber, req.params.Identifier);

    res.send('Ride Removed Successfully');
});

server.delete('/delete_lyft/:Identifier', function(req, res) {
    Noah.RemoveLyft(cab_rides, req.params.Identifier);
    cab_rides_removed = true

    res.send('Ride Removed Successfully');
});

server.post('/add_fhv_ride', function(req, res) {
    res.send('Showing Editable Things');
});

server.post('/add_uber_ride', function(req, res) {
    res.send('Showing Editable Things');
});

server.post('/add_lyft_ride', function(req, res) {
    res.send('Showing Editable Things');
});

//compare Uber to other riding services
server.post('/compare_results', function(req, res) {
    var results;
    console.log('Server', req.body.rideService1, req.body.rideService2, req.body.date, req.body.date2);
    
    if (uber_rides_modified) {
        for (let i = 0; i < uber_rides_updates.length; i++) {
            if (uber_rides_updates[i].action == 'delete') {
                Noah.updateUberCompareCount(uber, -1, uber_rides_updates[i].month)
            }
            else if (uber_rides_updates[i].action == 'add') {
                Noah.updateUberCompareCount(uber, 1, uber_rides_updates[i].month)
            }
            else {
                //do nothing
            }
        }
        uber_rides_updates = []
        uber_rides_modified = false
    }

    if (fhv_rides_modified) {
        for (let i = 0; i < fhv_rides_updates.length; i++) {
            if (fhv_rides_updates[i].action == 'delete') {
                Noah.updateFHVCompareCount(fhv, -1, fhv_rides_updates[i].month, fhv_rides_updates[i].service)
            }
            else if (fhv_rides_updates[i].action == 'add') {
                Noah.updateFHVCompareCount(fhv, 1, fhv_rides_updates[i].month, fhv_rides_updates[i].service)
            }
            else {
                //do nothing
            }
        }
        fhv_rides_updates = []
        fhv_rides_modified = false
    }
    
    results = Noah.CompareBasedOnMonth(req.body.rideService1, req.body.rideService2, req.body.date,req.body.date2);
    console.log(results);
    res.send(results);
});

