const fs = require('fs');

function CompareBasedOnMonth(uber_rides, fhv_rides, name_1, name_2, date, date2) 
{
    var compare = [];
    first_count = 0;
    second_count = 0;
    console.log('Comparing ', name_1, ' to ', name_2);
    //check all the months

    if (name_1 == 'Uber') {
        for (let i = 0; i < uber_rides.length; i++) {
            if (uber_rides[i].date[6] == date[6]) {
                first_count += 1;
            }
        }
    }
    else {
        for (let i = 0; i < fhv_rides.length; i++) {
            if ((fhv_rides[i].date[6] == date[6]) && (fhv_rides[i].name == name_1)) {
                first_count += 1;
            }
        }
    }

    if (name_2 == 'Uber') {
        for (let i = 0; i < uber_rides.length; i++) {
            if (uber_rides[i].date[6] == date2[6]) {
                second_count += 1;
            }
        }
    }
    else {
        for (let i = 0; i < fhv_rides.length; i++) {
            if ((fhv_rides[i].date[6] == date2[6]) && (fhv_rides[i].name == name_2)) {
                second_count += 1;
            }
        }
    }

    compare.push({"month": date, "name1": name_1,"month2": date2, "name2": name_2, "count1": first_count, "count2": second_count});
    /*console.log('Uber Rides: ' + u_rides + ' | ', f_name + ' Rides: ' + f_rides);
    output = 'Uber Rides: ' + u_rides + ' | ', f_name + ' Rides: ' + f_rides
    output = {"uber": u_rides, "f_name": f_name, "f_rides":f_rides}*/
    console.log('Finished Calculation');
    //console.log(compare);
    return compare
}

function TrendsForUber() {
    
}


function SearchByParameter(rides, ride_service, date_begin, date_end, time_begin, time_end, location, source, destination, lyft_type, search_type) {
    var toReturn = [];
    console.log('Service = ' + ride_service);
    if (ride_service == 'Uber') {
        console.log('Inside Uber')
        for (let i = 0; i < rides.length; i++) {
            
            if(typeof rides[i] === 'undefined' || typeof rides[i].date === 'undefined' || typeof rides[i].time === 'undefined')
            {
                continue;
            }

            //converting date and time to ints for parameters
            date_b_string = date_begin.replace(/-/g, '');
            date_e_string = date_end.replace(/-/g, '');
            time_b_string = time_begin.replace(/:/g, '');
            time_e_string = time_end.replace(/:/g, '');
            // console.log(date_b_string);
            // console.log(date_e_string);
            // console.log(time_b_string);
            // console.log(time_e_string);


            date_b = parseInt(date_b_string);
            date_e = parseInt(date_e_string);
            time_b = parseInt(time_b_string);
            time_e = parseInt(time_e_string);

            //converting date and time to ints for internal data
            rides_date_string = rides[i].date.replace(/-/g, '');
            rides_time_string = rides[i].time.replace(/:/g, '');

            rides_date = parseInt(rides_date_string);
            rides_time = parseInt(rides_time_string);

            //console.log(rides_date_b, date_b, date_e, (rides_date_b >= date_b && rides_date_e <= date_e), rides_time_b, time_b, time_e, (rides_time_b >= time_b && rides_time_e <= time_e))
            if ((rides_date >= date_b && rides_date <= date_e) && (rides_time >= time_b && rides_time <= time_e)) {
                console.log('We have a winner');
                if (search_type == 'view_only') {
                    toReturn.push({"Date": rides[i].date, "Time": rides[i].time, "Address": '(longitude, latitude) ' + rides[i].longitude + ', ' + rides[i].latitude + ' | Base: ' + rides[i].base, "Type": "view_only"});
                }
                else {
                    toReturn.push({"Identifier": rides[i].identifier, "Date": rides[i].date, "Time": rides[i].time, "Longitude": rides[i].longitude, "Latitude": rides[i].latitude, "Base": rides[i].base, "Type": "edit_uber"});
                }
            }
        }
    }
    else if (ride_service == 'Lyft') {
        console.log('Inside Lyft');
        for (let i = 0; i < rides.length; i++) {
            
            if(typeof rides[i] === 'undefined' || typeof rides[i].identifier === 'undefined' || typeof rides[i].source === 'undefined' || typeof rides[i].destination === 'undefined' || typeof rides[i].name === 'undefined')
            {
                continue;
            }

            if (rides[i].source == source && rides[i].destination == destination && rides[i].name == lyft_type) {
                console.log('We have a winner');
                if (search_type == 'view_only') {
                    toReturn.push({"Source": rides[i].source, "Destination": rides[i].destination, "lyftType": rides[i].name, "Price": rides[i].price, "Distance": rides[i].distance, "Type": "view_only_l"});
                }
                else {
                    toReturn.push({"Identifier": rides[i].identifier, "Source": rides[i].source, "Destination": rides[i].destination, "lyftType": rides[i].name, "Price": rides[i].price, "Distance": rides[i].distance, "Type": "edit_lyft"});
                }
            }
        }
    }
    else {
        console.log('Inside Other')
        for (let i = 0; i < rides.length; i++) {
            if(typeof rides[i] === 'undefined' || typeof rides[i].date === 'undefined' || typeof rides[i].time === 'undefined')
            {
                continue;
            }

            //converting date and time to ints for parameters
            date_b_string = date_begin.replace(/-/g, '');
            date_e_string = date_end.replace(/-/g, '');
            time_b_string = time_begin.replace(/:/g, '');
            time_e_string = time_end.replace(/:/g, '');

            date_b = parseInt(date_b_string);
            date_e = parseInt(date_e_string);
            time_b = parseInt(time_b_string);
            time_e = parseInt(time_e_string);

            //converting date and time to ints for internal data
            rides_date_string = rides[i].date.replace(/-/g, '');
            rides_time_string = rides[i].time.replace(/:/g, '');

            rides_date = parseInt(rides_date_string);
            rides_time = parseInt(rides_time_string);
            //console.log('PARAMETERS:', ride_service, date_begin, date_end, time_begin, time_end, location);
            //console.log('ELSE: ', rides[i].date, rides[i].time, rides[i].address);

            //console.log('PARAMETERS:', ride_service, date_b, date_e, time_b, time_e, location);
            //console.log('ELSE: ', rides_date_b, rides_date_e, rides_time_b, rides_time_e);
            //console.log(rides_date, date_b, date_e, (rides_date >= date_b && rides_date <= date_e), rides_time, time_b, time_e, (rides_time >= time_b && rides_time <= time_e))
            if ((ride_service == rides[i].name) && (rides_date >= date_b && rides_date <= date_e) && (rides_time >= time_b && rides_time <= time_e) && rides[i].address.includes(location)) {
                console.log('We have a winner');
                if (search_type == 'view_only') {
                    toReturn.push({"Date": rides[i].date, "Time": rides[i].time, "Address": rides[i].address, "Type": "view_only"});
                }
                else {
                    toReturn.push({"Identifier": rides[i].identifier, "Date": rides[i].date, "Time": rides[i].time, "Address": rides[i].address, "Type": "edit_fhv"});
                }
            }
        }
    }
    return toReturn;
}

function AddUber(uber_rides, date, time, longitude, latitude, base) {
    console.log(date, time, longitude, latitude, base)
    uber_rides.push({"date": date, "time": time, "latitude": latitude, "longitude": longitude, "base": base, "identifier": uber_rides.length});
    console.log(uber_rides[uber_rides.length - 1])
}

function AddFHV(fhv_rides, name, date, time, address) {
    console.log(date, time, address);
    fhv_rides.push({"date": date, "time": time, "address": address, "name": name, "identifier": fhv_rides.length});
    console.log(fhv_rides[fhv_rides.length - 1])
}

function AddLyft(cab_rides, source, destination, lyft_type, price, distance) {
    cab_rides.push({"distance":distance, "cab_type": 'Lyft', "time_stamp": 0, "destination":destination, "source":source, "price":price, "surge_multiplier": 0, "id": 0, "product_id": 0, "name":lyft_type, "identifier":cab_rides.length});
    console.log(cab_rides[cab_rides.length - 1])
}

function UpdateFHV(fhv_rides, identifier, date, time, address) {
    console.log(identifier, date, time, address)

    for (let i = 0; i < fhv_rides.length; i++) {
        if(typeof fhv_rides[i] === 'undefined')
        {
            console.log("Item is not defined...")
        }
        else if (fhv_rides[i].identifier == identifier) {
            fhv_rides[i].date = date;
            fhv_rides[i].time = time;
            fhv_rides[i].address = address;
            return 0;
        }
        else {
            // do nothing
        }
    }
}

function UpdateUber(uber_rides, identifier, date, time, longitude, latitude, base) {
    console.log(identifier, date, time, longitude, latitude, base)
    for (let i = 0; i < uber_rides.length; i++) {
        if(typeof uber_rides[i] === 'undefined')
        {
            console.log("Item is not defined...")
        }
        else if (uber_rides[i].identifier == identifier) {
            uber_rides[i].date = date;
            uber_rides[i].time = time;
            uber_rides[i].longitude = longitude;
            uber_rides[i].latitude = latitude;
            uber_rides[i].base = base;
            return 0;
        }
        else {
            // do nothing
        }
    }
}

function UpdateLyft(cab_rides, identifier, source, destination, lyft_type, price, distance) {
    console.log(identifier, source, destination, lyft_type, price, distance)
    for (let i = 0; i < cab_rides.length; i++) {
        if(typeof cab_rides[i] === 'undefined' || typeof cab_rides[i].identifier === 'undefined' || typeof cab_rides[i].source === 'undefined' || typeof cab_rides[i].destination === 'undefined' || typeof cab_rides[i].name === 'undefined')
            {
                continue;
            }
        else if (cab_rides[i].identifier == identifier) {
            console.log(identifier, cab_rides[i].identifier)
            cab_rides[i].source = source;
            cab_rides[i].destination = destination;
            cab_rides[i].name = lyft_type;
            cab_rides[i].price = price;
            cab_rides[i].distance = distance;
            return 0;
        }
        else {
            console.log(identifier, cab_rides[i].identifier)
        }
    }
}

function RemoveFHV(fhv_rides, identifier) {
    for (let i = 0; i < fhv_rides.length; i++) {
        if(typeof fhv_rides[i] === 'undefined')
        {
            console.log("Item is not defined...")
        }
        else if (fhv_rides[i].identifier == identifier) {
            delete fhv_rides[i];
            console.log(fhv_rides[i + 1])
            return 0;
        }
        else {
            // do nothing
        }
    }
}

function RemoveUber(uber_rides, identifier) {
    for (let i = 0; i < uber_rides.length; i++) {
        if(typeof uber_rides[i] === 'undefined')
        {
            console.log("Item is not defined...")
        }
        else if (uber_rides[i].identifier == identifier) {
            delete uber_rides[i];
            console.log(uber_rides[i + 1])
            return 0;
        }
        else {
            // do nothing
        }
    }
}

function RemoveLyft(cab_rides, identifier) {
    for (let i = 0; i < cab_rides.length; i++) {
        if(typeof cab_rides[i] === 'undefined' || typeof cab_rides[i].identifier === 'undefined' || typeof cab_rides[i].source === 'undefined' || typeof cab_rides[i].destination === 'undefined' || typeof cab_rides[i].name === 'undefined')
            {
                continue;
            }
        else if (cab_rides[i].identifier == identifier) {
            delete cab_rides[i];
            console.log(cab_rides[i + 1])
            return 0;
        }
        else {
            // do nothing
        }
    }
}

module.exports = { CompareBasedOnMonth, SearchByParameter, UpdateFHV, UpdateUber, UpdateLyft, RemoveFHV, RemoveUber, RemoveLyft, AddUber, AddLyft, AddFHV };