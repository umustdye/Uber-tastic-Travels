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

// Dataset files
const uber_files = ["csv_files\\Uber_Rides_1.csv", "csv_files\\Uber_Rides_2.csv", "csv_files\\Uber_Rides_3.csv"];
const fhv_files = ["csv_files\\FHV_Rides.csv"]
const cab_files = ["csv_files\\cab_rides.csv"]

// Dataset parse
uber = UberParser.ParseUber(uber_files);
fhv = fhvParser.Parsefhv(fhv_files);
cab_rides = cab_rides_parser.ParseCab_Rides(cab_files);
// cab_rides_parser.parseJSONToCSV(cab_rides);


//Incremental implemenation for compare based on month
var uber_rides_modified = false
var uber_rides_updates = []
var fhv_rides_modified = false
var fhv_rides_updates = []

beginOld = new Date().getTime();
Noah.updateUberCompareCount(uber, 0, 0);
Noah.updateFHVCompareCount(fhv, 0, 0, 'all');
endOld = new Date().getTime();
console.log('Compare by Month Incremental Analytics Initial Run: ', endOld - beginOld)


//For cab_type
var add_ride_lyft = false;
//var add_ride_uber = false;
//var delete_ride_uber = false;
var delete_ride_lyft = false;
//var uber_to_lyft = false;
var cabTypeInit = false;
//End of cab_type variables

//Incremental implementation for cab_price
cab_price_removed = false;
cab_price_added = false;
cab_price_updates = [];

beginOld = new Date().getTime();
Bao.cab_price_calc(cab_rides);
endOld = new Date().getTime();
console.log('Cab Price Incremental Analytics Initial Run: ', endOld - beginOld)

//Incremental implementation for popular routes
popular_routes_modified = false;
popular_routes_updates = []

beginOld = new Date().getTime();
Bao.popular_routes_calc(cab_rides);
endOld = new Date().getTime();
console.log('Popular Routes Incremental Analytics Initial Run: ', endOld - beginOld)


//Incremental implementation for most_popular
popular_destination_boston = Bao.popular_destination_boston(cab_rides);

beginOld = new Date().getTime();
Bao.popular_destination_boston(cab_rides);
endOld = new Date().getTime();
console.log('Most Popular  Incremental Analytics Initial Run: ', endOld - beginOld)



//Incremental implementation for busiest_time

busiest_time_uber = Heidi.FindBusiestTime(uber, fhv, "Uber");
busiest_time_american = Heidi.FindBusiestTime(uber, fhv, "American");
busiest_time_diplo = Heidi.FindBusiestTime(uber, fhv, "Diplo");
busiest_time_firstclass = Heidi.FindBusiestTime(uber, fhv, "Firstclass");
busiest_time_highclass = Heidi.FindBusiestTime(uber, fhv, "Highclass");
busiest_time_prestige = Heidi.FindBusiestTime(uber, fhv, "Prestige");

//Incremental implemenation for compare based on month
var uber_rides_modified = false
var uber_rides_updates = []
var fhv_rides_modified = false
var fhv_rides_updates = []

beginOld = new Date().getTime();
Noah.updateUberCompareCount(uber, 0, 0);
Noah.updateFHVCompareCount(fhv, 0, 0, 'all');
endOld = new Date().getTime();
console.log('Compare by Month Incremental Analytics Initial Run: ', endOld - beginOld)

//Incremental implementation for cab_price
cab_price_removed = false;
cab_price_added = false;
cab_price_updates = []

beginOld = new Date().getTime();
Bao.cab_price_calc(cab_rides);
endOld = new Date().getTime();
Bao.popular_routes_calc(cab_rides)
console.log('Cab Price Incremental Analytics Initial Run: ', endOld - beginOld)

//Incremental implementation for popular routes
popular_routes_modified = false;
popular_routes_updates = []

beginOld = new Date().getTime();
Bao.popular_routes_calc(cab_rides);
endOld = new Date().getTime();
console.log('Popular Routes Incremental Analytics Initial Run: ', endOld - beginOld)

//public is name of html directory, basically website shtuff
server.use(express.static('public'));

server.use(bodyParser.json());

server.get('/pickup_date', function(req, res){
    res.send({ uber_date: uber.slice(1, 20)});
});
//Bao's Analytics
server.get('/cab_type', function(req, res)
{
    if (!cabTypeInit) {
        cabTypeInit = true;
        cab_type = Bao.cab_type(cab_rides);
    }

    if (add_ride_lyft) {
        add_ride_lyft = false;
        cab_type.Lyft += 1;
        cab_type.Total += 1;
    }


    if (delete_ride_lyft) {
        delete_ride_lyft = false;
        cab_type.Lyft -= 1;
        cab_type.Total -= 1;
    }
    //cab_type = Bao.cab_type(cab_rides);
    res.send({cab_type, cab_type});
});

server.get('/cab_price', function(req, res)
{
    beginNew = new Date().getTime()
    if (cab_price_added && !cab_price_removed) {
        for (let i = 0; i < cab_rides_updates.length; i++) {
            Bao.cab_price_add(cab_rides_updates[i].name, cab_rides_updates[i].price, cab_rides_updates[i].distance, cab_rides_updates[i].cab_type)
        }
        cab_price_added = false;
    }
    if (cab_price_removed) {
        Bao.cab_price_calc(cab_rides)
        cab_price_removed = false;

        if (cab_price_added) {
            cab_price_added = false;
        }
    }
    Bao.cab_price(/*cab_rides*/);
    endNew = new Date().getTime()

    console.log('Cab Price - Incremental Analytics:', endNew - beginNew)

    cab_price = Bao.cab_price(/*cab_rides*/);
    res.send({cab_price, cab_price});
});

server.get('/popular_destination_boston', function(req, res)
{
    //popular_destination_boston = Bao.popular_destination_boston(cab_rides);
    res.send({popular_destination_boston, popular_destination_boston});
});

server.get('/popular_routes', function(req, res)
{
    if (popular_routes_modified) {
        for (let i = 0; i < popular_routes_updates.length; i++) {
            if (popular_routes_updates[i].action == 'delete') {
                Bao.popular_routes_subtract(popular_routes_updates[i].source, popular_routes_updates[i].destination)
            }
            else if (popular_routes_updates[i].action == 'add') {
                Bao.popular_routes_add(popular_routes_updates[i].source, popular_routes_updates[i].destination)
            }
            else {
                //do nothing
            }
        }
        popular_routes_updates = []
        popular_routes_modified = false
    }
    popular_routes = Bao.popular_routes();
    res.send({popular_routes, popular_routes});
});

server.get('/save_uber', function(req, res){
    UberParser.parseJSONToCSV(uber, uber_files);
    res.send("Successfully saved Uber dataset to file...");
});

server.get('/save_fhv', function(req, res){
    fhvParser.parseJSONToCSV(fhv, fhv_files);
    res.send("Successfully saved fhv dataset to file...");
});

server.get('/save_lyft', function(req, res){
    cab_rides_parser.parseJSONToCSV(cab_rides, cab_files);
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
    //busiest_time = Heidi.FindBusiestTime(uber, fhv, req.body.Service);
    /*console.log("Busiest Time: ");
    busiest_time.forEach(hour => {
        console.log(hour)
    })*/
    if(req.body.Service == "Uber")
        res.send({Busiest_Time: busiest_time_uber});
    else if(req.body.Service == "American")
        res.send({Busiest_Time: busiest_time_american});
    else if(req.body.Service == "Diplo")
        res.send({Busiest_Time: busiest_time_diplo});
    else if(req.body.Service == "Highclass")
        res.send({Busiest_Time: busiest_time_highclass});
    else if(req.body.Service == "Firstclass")
        res.send({Busiest_Time: busiest_time_firstclass});
    else if(req.body.Service == "Prestige")
        res.send({Busiest_Time: busiest_time_prestige});
    //res.send({Busiest_Time: busiest_time});
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

    //incremental analytics for busiest time
    if(req.body.Service == "American")
        busiest_time_american = Heidi.addBusiestTime(busiest_time_american, req.body.Time);
    else if(req.body.Service == "Diplo")
        busiest_time_diplo = Heidi.addBusiestTime(busiest_time_diplo, req.body.Time);
    else if(req.body.Service == "Highclass")
        busiest_time_highclass = Heidi.addBusiestTime(busiest_time_highclass, req.body.Time);
    else if(req.body.Service == "Firstclass")
        busiest_time_firstclass = Heidi.addBusiestTime(busiest_time_firstclass, req.body.Time);
    else if(req.body.Service == "Prestige")
        busiest_time_prestige = Heidi.addBusiestTime(busiest_time_prestige, req.body.Time);

    res.send('Ride Added Successfully');
});

server.put('/add_uber', function(req, res) {
    Noah.AddUber(uber, req.body.Date, req.body.Time, req.body.Longitude, req.body.Latitude, req.body.Base);
    // Noah.updateUberCompareCount(uber, 1, req.body.Date[6]);
    uber_rides_modified = true
    uber_rides_updates.push({'service': 'Uber', 'action': 'add', 'month': req.body.Date[6]})
    
    //incremental analytics for busiest time
    busiest_time_uber = Heidi.addBusiestTime(busiest_time_uber, req.body.Time);
    
    res.send('Ride Added Successfully');
});

server.put('/add_lyft', function(req, res) {
    console.log(req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance)
    Noah.AddLyft(cab_rides, req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance);
    
    add_ride_lyft = true;
    cab_price_added = true;
    cab_price_updates.push({'type': 'Lyft', 'price': req.body.Price, 'distance': req.body.Distance, 'name': req.body.LyftType})
    
    popular_routes_modified = true;
    popular_routes_updates.push({'type': 'Lyft', 'source': req.body.Source, 'destination': req.body.Destination, 'action': 'add'});

    popular_destination_boston = Bao.add_popular_destination_boston(popular_destination_boston, req.body.Source, req.body.Destination);

    console.log('Ride Added Successfully');
    res.send('Ride Added Successfully');
});

//Modify Existing Ride
server.put('/modify_fhv/:Identifier', function(req, res) {
    //incremental analytics for busiest time 
    deleted = fhvParser.findFHV(fhv, req.params.Identifier);
    if(req.body.Service == "American")
    {
        busiest_time_american = Heidi.deleteBusiestTime(busiest_time_american, deleted.time);
        busiest_time_american = Heidi.addBusiestTime(busiest_time_american, req.body.Time);  
    }
        
    else if(req.body.Service == "Diplo")
    {
        busiest_time_diplo = Heidi.deleteBusiestTime(busiest_time_diplo, deleted.time);
        busiest_time_diplo = Heidi.addBusiestTime(busiest_time_diplo, req.body.Time); 
    }

    else if(req.body.Service == "Highclass")
    {
        busiest_time_highclass = Heidi.deleteBusiestTime(busiest_time_highclass, deleted.time);
        busiest_time_highclass = Heidi.addBusiestTime(busiest_time_highclass, req.body.Time);
    }
        
    else if(req.body.Service == "Firstclass")
    {
        busiest_time_firstclass = Heidi.deleteBusiestTime(busiest_time_firstclass, deleted.time);
        busiest_time_firstclass = Heidi.addBusiestTime(busiest_time_firstclass, req.body.Time);
    }

    else if(req.body.Service == "Prestige")
    {
        busiest_time_prestige = Heidi.deleteBusiestTime(busiest_time_prestige, deleted.time);
        busiest_time_prestige = Heidi.addBusiestTime(busiest_time_prestige, req.body.Time);
    }
        


    Noah.UpdateFHV(fhv, req.params.Identifier, req.body.Date, req.body.Time, req.body.Address);


    res.send('Ride Updated Successfully');
});

server.put('/modify_uber/:Identifier', function(req, res) {
    //incremental analytics for busiest time delete
    deleted = UberParser.findUber(uber, req.params.Identifier);
    busiest_time_uber = Heidi.deleteBusiestTime(busiest_time_uber, deleted.time);

    Noah.UpdateUber(uber, req.params.Identifier, req.body.Date, req.body.Time, req.body.Longitude, req.body.Latitude, req.body.Base);

    //incremental analytics for busiest time 
    busiest_time_uber = Heidi.addBusiestTime(busiest_time_uber, req.body.Time);

    res.send('Ride Updated Successfully');
});

server.put('/modify_lyft/:Identifier', function(req, res) {
    console.log(req.params.Identifier, req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance)
    oldData = cab_rides_parser.findLyft(cab_rides, req.params.Identifier);
    popular_destination_boston = Bao.delete_popular_destination_boston(cab_rides, oldData.source, oldData.destination);
    Noah.UpdateLyft(cab_rides, req.params.Identifier, req.body.Source, req.body.Destination, req.body.LyftType, req.body.Price, req.body.Distance);
    popular_destination_boston = Bao.add_popular_destination_boston(cab_rides, req.body.Source, req.body.Destination);
    
    res.send('Ride Updated Successfully');
    
});

//Remove existing ride
server.delete('/delete_fhv/:Identifier', function(req, res) {
    ride = Noah.findByIdentifier(fhv, 'Other', req.params.Identifier)
    // Noah.updateFHVCompareCount(fhv, -1, ride.Month, ride.Name);
    fhv_rides_modified = true
    fhv_rides_updates.push({'service': ride.Name, 'action': 'delete', 'month': ride.Month})
    //incremental analytics for busiest time
    deleted = fhvParser.findFHV(fhv, req.params.Identifier);
    if(req.body.Service == "American")
        busiest_time_american = Heidi.deleteBusiestTime(busiest_time_american, deleted.time);
    else if(req.body.Service == "Diplo")
        busiest_time_diplo = Heidi.deleteBusiestTime(busiest_time_diplo, deleted.time);
    else if(req.body.Service == "Highclass")
        busiest_time_highclass = Heidi.deleteBusiestTime(busiest_time_highclass, deleted.time);
    else if(req.body.Service == "Firstclass")
        busiest_time_firstclass = Heidi.deleteBusiestTime(busiest_time_firstclass, deleted.time);
    else if(req.body.Service == "Prestige")
        busiest_time_prestige = Heidi.deleteBusiestTime(busiest_time_prestige, deleted.time);
    Noah.RemoveFHV(fhv, req.params.Identifier);

    res.send('Ride Removed Successfully');
});

server.delete('/delete_uber/:Identifier', function(req, res) {
    ride = Noah.findByIdentifier(uber, 'Uber', req.params.Identifier)
    // Noah.updateUberCompareCount(uber, -1, ride.Month);
    uber_rides_modified = true
    uber_rides_updates.push({'service': 'Uber', 'action': 'delete', 'month': ride.Month})
    //incremental analytics for busiest time
    deleted = UberParser.findUber(uber, req.params.Identifier);
    busiest_time_uber = Heidi.deleteBusiestTime(busiest_time_uber, deleted.time);
    
    
    Noah.RemoveUber(uber, req.params.Identifier);

    res.send('Ride Removed Successfully');
});

server.delete('/delete_lyft/:Identifier', function(req, res) {
    ride = Noah.findByIdentifier(cab_rides, 'Lyft', req.params.Identifier)
    popular_routes_modified = true;
    popular_routes_updates.push({'type': 'Lyft', 'source': ride.source, 'destination': ride.destination, 'action': 'delete'});
    popular_destination_boston = Bao.delete_popular_destination_boston(popular_destination_boston, ride.source, ride.destination);
    Noah.RemoveLyft(cab_rides, req.params.Identifier);
    cab_price_removed = true
    delete_ride_lyft = true;
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
    
    beginNew = new Date().getTime()
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

    endNew = new Date().getTime();

    console.log('Compare Based on Month - Incremental Analytics:', endNew - beginNew)

    results = Noah.CompareBasedOnMonth(req.body.rideService1, req.body.rideService2, req.body.date,req.body.date2);
    console.log(results);
    res.send(results);
});


server.post('/next_twenty', function(req, res) {
    res.send('Showing next twenty');
});

server.post('/past_twenty', function(req, res) {
    res.send('Showing last twenty');
});