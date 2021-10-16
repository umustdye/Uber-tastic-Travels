const fs = require('fs');

class UberRide {
    constructor(date, time, latitude, longitude) {
        this.date = date;
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class FHVRide {
    constructor(date, time, address, name) {
        this.date = date;
        this.time = time;
        this.address = address;
        this.name = name;
    }
}

var uber_rides = []
var fhv_rides = []

function ParseCSV() {
    console.log('Reading in Files');

    var uber_set = ['./csv_files/uber-raw-data-apr14.csv', './csv_files/uber-raw-data-may14.csv', './csv_files/uber-raw-data-jun14.csv', './csv_files/uber-raw-data-jul14.csv', './csv_files/uber-raw-data-aug14.csv', './csv_files/uber-raw-data-sep14.csv'];

    for (let i = 0; i < uber_set.length; i++) {
        data = fs.readFileSync(uber_set[i], 'utf8');

        //data = data.replaceAll("\"", "")
        data = data.replace(/\"/g, '')
        //data = data.replaceAll('Date/Time','Date,Time')
        //data = data.replace(/Date/Time/s,'Date,Time')
        //data = data.replaceAll('/2014','/2014,')
        //data = data.replace(/2014/g,'/2014,')
        //console.log(data)

        const data_table = data.split('\n').slice(1);

        data_table.forEach(ride => {
            table_row = ride.split(',');
            let rideNew = new UberRide(table_row[0], table_row[1], table_row[2], table_row[3]);
            uber_rides.push(rideNew);
        })

    }

    var fhv_set = ['./csv_files/other-Prestige_B01338.csv', './csv_files/other-Highclass_B01717.csv', './csv_files/other-Firstclass_B01536.csv', './csv_files/other-Diplo_B01196.csv', './csv_files/other-American_B01362.csv'];
    var fhv_names = ['Prestige', 'Highclass', 'Firstclass', 'Diplo', 'American'];
    for (let i = 0; i < fhv_set.length; i++) {
        data = fs.readFileSync(fhv_set[i], 'utf8');

        //data = data.replaceAll('\" ','')
        //data = data.replaceAll('\"','')
        data = data.replace('\" ','')
        data = data.replace('\"','')

        const data_table = data.split('\n').slice(1);

        data_table.forEach(ride => {
            table_row = ride.split(',');
            let rideNew = new FHVRide(table_row[0], table_row[1], table_row[2], fhv_names[i]);
            fhv_rides.push(rideNew);
        })
    }

    console.log('Files Read Successfully');
}

function CompareBasedOnMonth() {
    var u_rides = 0;
    var f_rides = 0;
    var specified_month = 7;
    var f_name = 'Diplo';

    console.log('Comparing Uber to ' + f_name)

    for (let i = 0; i < uber_rides.length; i++) {
        if (uber_rides[i].date.charAt(0) == specified_month) {
            u_rides = u_rides + 1;
        }
    }

    for (let i = 0; i < fhv_rides.length; i++) {
        if ((fhv_rides[i].date.charAt(0) == specified_month) && (fhv_rides[i].name == f_name)) {
            f_rides = f_rides + 1;
        }
    }
    console.log('Uber Rides: ' + u_rides + ' | ', f_name + ' Rides: ' + f_rides);
    output = 'Uber Rides: ' + u_rides + ' | ', f_name + ' Rides: ' + f_rides
    output = {"uber": u_rides, "f_name": f_name, "f_rides":f_rides}
    console.log('Finished Calculation');
    return output
}

function TrendsForUber() {
    
}

module.exports = { CompareBasedOnMonth, ParseCSV };