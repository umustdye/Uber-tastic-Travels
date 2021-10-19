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

function convertTo24Hr (toConvert) {
    if (toConvert.includes('AM')) {
        if ((toConvert[0] == 1) && (toConvert[1] == 2)) { //12 AM
            converted = '00:' + toConvert[3] + toConvert[4];
            return converted;
        }
        else if ((toConvert[0] == 1) && (toConvert[1] == 1)) { //11 AM
            converted = '11:' + toConvert[3] + toConvert[4];
            return converted;
        }
        else if ((toConvert[0] == 1) && (toConvert[1] == 0)) { //10 AM
            converted = '10:' + toConvert[3] + toConvert[4];
            return converted;
        }
        else if ((toConvert[0] == 9)) { //9 AM
            converted = '09:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 8)) { //8 AM
            converted = '08:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 7)) { //7 AM
            converted = '07:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 6)) { //6 AM
            converted = '06:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 5)) { //5 AM
            converted = '05:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 4)) { //4 AM
            converted = '04:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 3)) { //3 AM
            converted = '03:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 2)) { //2 AM
            converted = '02:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else { //1 AM
            converted = '01:' + toConvert[2] + toConvert[3];
            return converted;
        }
    }
    else {
        if ((toConvert[0] == 1) && (toConvert[1] == 2)) { //12 PM
            converted = '12:' + toConvert[3] + toConvert[4];
            return converted;
        }
        else if ((toConvert[0] == 1) && (toConvert[1] == 1)) { //11 PM
            converted = '23:' + toConvert[3] + toConvert[4];
            return converted;
        }
        else if ((toConvert[0] == 1) && (toConvert[1] == 0)) { //10 PM
            converted = '22:' + toConvert[3] + toConvert[4];
            return converted;
        }
        else if ((toConvert[0] == 9)) { //9 PM
            converted = '21:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 8)) { //8 PM
            converted = '20:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 7)) { //7 PM
            converted = '19:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 6)) { //6 PM
            converted = '18:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 5)) { //5 PM
            converted = '17:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 4)) { //4 PM
            converted = '16:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 3)) { //3 PM
            converted = '15:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else if ((toConvert[0] == 2)) { //2 PM
            converted = '14:' + toConvert[2] + toConvert[3];
            return converted;
        }
        else { //1 PM
            converted = '13:' + toConvert[2] + toConvert[3];
            return converted;
        }
    }
}

function ParseCSV() {
    console.log('Reading in Files');

    var uber_set = ['./csv_files/uber-raw-data-apr14.csv', './csv_files/uber-raw-data-may14.csv', './csv_files/uber-raw-data-jun14.csv', './csv_files/uber-raw-data-jul14.csv', './csv_files/uber-raw-data-aug14.csv', './csv_files/uber-raw-data-sep14.csv'];

    for (let i = 0; i < uber_set.length; i++) {
        data = fs.readFileSync(uber_set[i], 'utf8');

        data = data.replaceAll(':00\"','');
        data = data.replaceAll("\"", "");
        // data = data.replace(/\"/g, '')
        data = data.replaceAll('/2014 ','/2014,');
        data = data.replaceAll('Date/Time','Date,Time');
        data = data.replaceAll('/','-');
        // data = data.replace(/Date/Time/s,'Date,Time')
        // data = data.replace(/2014/g,'/2014,')
        // console.log(data)

        const data_table = data.split('\n').slice(1);

        data_table.forEach(ride => {
            table_row = ride.split(',');

            if (table_row[0].length > 0 && table_row[1].length > 0) {
                let curr_date = new Date(table_row[0]);

                corrected_date = curr_date.toJSON();

                a_the_date = corrected_date[0] + corrected_date[1] + corrected_date[2] + corrected_date[3] + corrected_date[4] + corrected_date[5] + corrected_date[6] + corrected_date[7] + corrected_date[8] + corrected_date[9]; //useful for search
                
                let rideNew = new UberRide(a_the_date, table_row[1], table_row[2], table_row[3]);
                uber_rides.push(rideNew);
            }
        })

    }

    var fhv_set = ['./csv_files/other-Prestige_B01338.csv', './csv_files/other-Highclass_B01717.csv', './csv_files/other-Firstclass_B01536.csv', './csv_files/other-Diplo_B01196.csv', './csv_files/other-American_B01362.csv'];
    var fhv_names = ['Prestige', 'Highclass', 'Firstclass', 'Diplo', 'American'];
    for (let i = 0; i < fhv_set.length; i++) {
        data = fs.readFileSync(fhv_set[i], 'utf8');

        data = data.replaceAll('\" ','');
        data = data.replaceAll('\"','');
        data = data.replaceAll('/','-');
        
        // data = data.replace('\" ','')
        // data = data.replace('\"','')
        // console.log(data);

        const data_table = data.split('\n').slice(1);

        data_table.forEach(ride => {
            table_row = ride.split(',');

            if (table_row[0].length > 0 && table_row[1].length > 0) {
                convertedTime = convertTo24Hr(table_row[1]);

                let curr_date = new Date(table_row[0]);

                corrected_date = curr_date.toJSON();

                a_the_date = corrected_date[0] + corrected_date[1] + corrected_date[2] + corrected_date[3] + corrected_date[4] + corrected_date[5] + corrected_date[6] + corrected_date[7] + corrected_date[8] + corrected_date[9]; //useful for search
                
                let rideNew = new FHVRide(a_the_date, convertedTime, table_row[2], fhv_names[i]);
                fhv_rides.push(rideNew);
            }
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
        if (uber_rides[i].date.charAt(6) == specified_month) {
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
    return output;
}

function SearchByParameter(ride_service, date_begin, date_end, time_begin, time_end, location) {
    var toReturn = [];
    console.log('Service = ' + ride_service);
    if (ride_service == 'Uber') {
        console.log('Inside Uber')
        for (let i = 0; i < uber_rides.length; i++) {
            //converting date and time to ints for parameters
            date_b_string = date_begin.replaceAll('-', '');
            date_e_string = date_end.replaceAll('-', '');
            time_b_string = time_begin.replaceAll(':', '');
            time_e_string = time_end.replaceAll(':', '');

            date_b = parseInt(date_b_string);
            date_e = parseInt(date_e_string);
            time_b = parseInt(time_b_string);
            time_e = parseInt(time_e_string);

            //converting date and time to ints for internal data
            rides_date_b_string = uber_rides[i].date.replaceAll('-', '');
            rides_date_e_string = uber_rides[i].date.replaceAll('-', '');
            rides_time_b_string = uber_rides[i].time.replaceAll(':', '');
            rides_time_e_string = uber_rides[i].time.replaceAll(':', '');

            rides_date_b = parseInt(rides_date_b_string);
            rides_date_e = parseInt(rides_date_e_string);
            rides_time_b = parseInt(rides_time_b_string);
            rides_time_e = parseInt(rides_time_e_string);

            if ((rides_date_b >= date_b && rides_date_e <= date_e) && (rides_time_b >= time_b && rides_time_e <= time_e)) {
                // console.log('We have a winner');
                toReturn.push({"Date": uber_rides[i].date, "Time": uber_rides[i].time, "Address": '(longitude, latitude)' + uber_rides[i].longitude + ', ' + uber_rides[i].latitude});
            }
        }
    }
    else {
        console.log('Inside Other')
        for (let i = 0; i < fhv_rides.length; i++) {
            //converting date and time to ints for parameters
            date_b_string = date_begin.replaceAll('-', '');
            date_e_string = date_end.replaceAll('-', '');
            time_b_string = time_begin.replaceAll(':', '');
            time_e_string = time_end.replaceAll(':', '');

            date_b = parseInt(date_b_string);
            date_e = parseInt(date_e_string);
            time_b = parseInt(time_b_string);
            time_e = parseInt(time_e_string);

            //converting date and time to ints for internal data
            rides_date_b_string = fhv_rides[i].date.replaceAll('-', '');
            rides_date_e_string = fhv_rides[i].date.replaceAll('-', '');
            rides_time_b_string = fhv_rides[i].time.replaceAll(':', '');
            rides_time_e_string = fhv_rides[i].time.replaceAll(':', '');

            rides_date_b = parseInt(rides_date_b_string);
            rides_date_e = parseInt(rides_date_e_string);
            rides_time_b = parseInt(rides_time_b_string);
            rides_time_e = parseInt(rides_time_e_string);
            // console.log('PARAMETERS:', ride_service, date_begin, date_end, time_begin, time_end, location);
            // console.log('ELSE: ', fhv_rides[i].date, fhv_rides[i].time, fhv_rides[i].address);
            if ((ride_service == fhv_rides[i].name) && (rides_date_b >= date_b && rides_date_e <= date_e) && (rides_time_b >= time_b && rides_time_e <= time_e) && fhv_rides[i].address.includes(location)) {
                // console.log('We have a winner');
                toReturn.push({"Date": fhv_rides[i].date, "Time": fhv_rides[i].time, "Address": fhv_rides[i].address});
            }
        }
    }
    return toReturn;
}

module.exports = { CompareBasedOnMonth, ParseCSV, SearchByParameter };