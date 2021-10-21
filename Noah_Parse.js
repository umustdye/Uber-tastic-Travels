const fs = require('fs');

function CompareBasedOnMonth(uber_rides, fhv_rides, f_name) 
{
    compare = [];
    console.log('Comparing Uber to ' + f_name)
    //check all the months
    for (let specified_month = 1; specified_month < 13; specified_month++)
    {
        var u_rides = 0;
        var f_rides = 0;
        //specified_month = 7;
        f_name = 'Diplo'; 

        for (let i = 0; i < uber_rides.length; i++) {
            /*if(typeof uber_rides[i].date.charAt(0) === 'undefined')
            {
                console.log("Month" + uber_rides[i].date.charAt(0) + "is not defined...");
                continue;
            }*/


            if (uber_rides[i].date.charAt(0) == specified_month) {
                u_rides = u_rides + 1;
            }
        }

        for (let i = 0; i < fhv_rides.length; i++) {
            if(typeof fhv_rides[i].date === 'undefined')
            {
                //console.log("Month " + i + " is not defined...");
                continue;
            }


            if ((fhv_rides[i].date.charAt(0) == specified_month) && (fhv_rides[i].name == f_name)) 
            {
                f_rides += 1;
            }
        }

        //save as JSON Object
        if(u_rides > 0 && f_rides > 0)
        {
            compare.push({"month": specified_month, "u_rides": u_rides, "f_name": f_name, "f_rides": f_rides});
        }
        
    }



    /*console.log('Uber Rides: ' + u_rides + ' | ', f_name + ' Rides: ' + f_rides);
    output = 'Uber Rides: ' + u_rides + ' | ', f_name + ' Rides: ' + f_rides
    output = {"uber": u_rides, "f_name": f_name, "f_rides":f_rides}*/
    console.log('Finished Calculation');
    //console.log(compare);
    return compare
}

function TrendsForUber() {
    
}


function SearchByParameter(uber_rides, fhv_rides, ride_service, date_begin, date_end, time_begin, time_end, location) {
    var toReturn = [];
    console.log('Service = ' + ride_service);
    if (ride_service == 'Uber') {
        console.log('Inside Uber')
        for (let i = 0; i < uber_rides.length; i++) {
            
            if(typeof uber_rides[i] === 'undefined' || typeof uber_rides[i].date === 'undefined' || typeof uber_rides[i].time === 'undefined')
            {
                continue;
            }



            //converting date and time to ints for parameters
            /*date_b_string = date_begin.replaceAll('-', '');
            date_e_string = date_end.replaceAll('-', '');
            time_b_string = time_begin.replaceAll(':', '');
            time_e_string = time_end.replaceAll(':', '');*/
            date_b_string = date_begin.replace(/-/g, '');
            date_e_string = date_end.replace(/-/g, '');
            time_b_string = time_begin.replace(/:/g, '');
            time_e_string = time_end.replace(/:/g, '');
            console.log(date_b_string);
            console.log(date_e_string);
            console.log(time_b_string);
            console.log(time_e_string);


            date_b = parseInt(date_b_string);
            date_e = parseInt(date_e_string);
            time_b = parseInt(time_b_string);
            time_e = parseInt(time_e_string);

            //converting date and time to ints for internal data
            /*rides_date_b_string = uber_rides[i].date.replaceAll('-', '');
            rides_date_e_string = uber_rides[i].date.replaceAll('-', '');
            rides_time_b_string = uber_rides[i].time.replaceAll(':', '');
            rides_time_e_string = uber_rides[i].time.replaceAll(':', '');*/
            rides_date_b_string = uber_rides[i].date.replace(/\//g, '');
            rides_date_e_string = uber_rides[i].date.replace(/\//g, '');
            rides_time_b_string = uber_rides[i].time.replace(/:/g, '');
            rides_time_e_string = uber_rides[i].time.replace(/:/g, '');


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
            if(typeof fhv_rides[i] === 'undefined' || typeof fhv_rides[i].date === 'undefined' || typeof fhv_rides[i].time === 'undefined')
            {
                continue;
            }

            //converting date and time to ints for parameters
            /*date_b_string = date_begin.replaceAll('-', '');
            date_e_string = date_end.replaceAll('-', '');
            time_b_string = time_begin.replaceAll(':', '');
            time_e_string = time_end.replaceAll(':', '');*/

            date_b_string = date_begin.replace(/-/g, '');
            date_e_string = date_end.replace(/-/g, '');
            time_b_string = time_begin.replace(/:/g, '');
            time_e_string = time_end.replace(/:/g, '');

            date_b = parseInt(date_b_string);
            date_e = parseInt(date_e_string);
            time_b = parseInt(time_b_string);
            time_e = parseInt(time_e_string);

            //converting date and time to ints for internal data
            /*rides_date_b_string = fhv_rides[i].date.replaceAll('-', '');
            rides_date_e_string = fhv_rides[i].date.replaceAll('-', '');
            rides_time_b_string = fhv_rides[i].time.replaceAll(':', '');
            rides_time_e_string = fhv_rides[i].time.replaceAll(':', '');*/

            rides_date_b_string = fhv_rides[i].date.replace(/-/g, '');
            rides_date_e_string = fhv_rides[i].date.replace(/-/g, '');
            rides_time_b_string = fhv_rides[i].time.replace(/:/g, '');
            rides_time_e_string = fhv_rides[i].time.replace(/:/g, '');

            rides_date_b = parseInt(rides_date_b_string);
            rides_date_e = parseInt(rides_date_e_string);
            rides_time_b = parseInt(rides_time_b_string);
            rides_time_e = parseInt(rides_time_e_string);
            //console.log('PARAMETERS:', ride_service, date_begin, date_end, time_begin, time_end, location);
            //console.log('ELSE: ', fhv_rides[i].date, fhv_rides[i].time, fhv_rides[i].address);

            //console.log('PARAMETERS:', ride_service, date_b, date_e, time_b, time_e, location);
            //console.log('ELSE: ', rides_date_b, rides_date_e, rides_time_b, rides_time_e);
            if ((ride_service == fhv_rides[i].name) && (rides_date_b >= date_b && rides_date_e <= date_e) && (rides_time_b >= time_b && rides_time_e <= time_e) && fhv_rides[i].address.includes(location)) {
                // console.log('We have a winner');
                toReturn.push({"Date": fhv_rides[i].date, "Time": fhv_rides[i].time, "Address": fhv_rides[i].address});
            }
        }
    }
    return toReturn;
}

module.exports = { CompareBasedOnMonth, SearchByParameter };
