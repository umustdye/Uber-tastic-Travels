'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');
var reader = require(path.join(__dirname, 'Data', 'Bao_CSVtoJSON.js'));
var writer = require(path.join(__dirname, 'Data', 'Writer.js'));
//var request = new XMLHttpRequest();

const app = express();

//set static folder called "public"
app.use(express.static(path.join(__dirname , 'public')));


//home page
app.get('/', function (req, res) {
    res.sendFile((__dirname + '/public' + '/home.html'));
});

//Middle-ware
const log = (req, res, next) => {
    console.log("Pepega");
    next();
};

//Initializing middle-ware
app.use(log);


//XMLHttpRequest command
//Download -> Get
//Send data to server -> Post

fs.readFile(path.join(__dirname,'Data','cab_rides.csv'), 'utf8', (err, data) => {
    var data1 = reader.CSVtoJSON(data);
    var data2 = reader.cab_type(data1);
    var data3 = reader.cab_price(data1);
    var data4 = reader.popular_destination_boston(data1);
    var data5 = reader.popular_routes(data1);
    try {
        writer.WriteToFile(path.join(__dirname, 'Data', 'cab_price.json'), data3);
        writer.WriteToFile(path.join(__dirname, 'Data', 'cab_type.json'), data2);
        writer.WriteToFile(path.join(__dirname, 'Data', 'popular_destination_boston.json'), data4);
        writer.WriteToFile(path.join(__dirname, 'Data', 'popular_routes.json'), data5);
    }
    catch (e) {
        console.log(e);
    }
});


var PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
