

function deleteBusiestTime(busiest_time, oldTime)
{
    //preparsed time
    PPTime = oldTime;
    //console.log("Preparsed Time: "+ PPTime)
    var time = "";
    for(let j = 0; j < PPTime.length; j++)
    {
        if((j == 0) && (PPTime[j] == "0"))
        {
            continue;
        }
        //get only the hour
        if(PPTime[j] == ":")
        {
            break;
        }
        else
        {
            time += PPTime[j];
        }
        
    }

    busiest_time[parseInt(time)].value--;

    return busiest_time;
}

function addBusiestTime(busiest_time, newTime)
{
    //preparsed time
    PPTime = newTime;
    //console.log("Preparsed Time: "+ PPTime)
    var time = "";
    for(let j = 0; j < PPTime.length; j++)
    {
        if((j == 0) && (PPTime[j] == "0"))
        {
            continue;
        }
        //get only the hour
        if(PPTime[j] == ":")
        {
            break;
        }
        else
        {
            time += PPTime[j];
        }
        
    }

    busiest_time[parseInt(time)].value++;

    return busiest_time;
}


function FindBusiestTime(uber_rides, fhv_rides, ride_service)
{
    var toReturn = [];
    console.log('Service = ' + ride_service);
    //var h_0, h_1, h_2, h_3, h_4, h_5, h_6, h_7, h_8, h_9, h_10, h_11, h_12;
    //var h_13, h_14, h_15, h_16, h_17, h_18, h_19, h_20, h_21, h_22, h_23;
    busiest_time = [
        {"hour": "Midnight", "value": 0},
        {"hour": "1 AM", "value": 0},
        {"hour": "2 AM", "value": 0},
        {"hour": "3 AM", "value": 0},
        {"hour": "4 AM", "value": 0},
        {"hour": "5 AM", "value": 0},
        {"hour": "6 AM", "value": 0},
        {"hour": "7 AM", "value": 0},
        {"hour": "8 AM", "value": 0},
        {"hour": "9 AM", "value": 0},
        {"hour": "10 AM", "value": 0},
        {"hour": "11 AM", "value": 0},
        {"hour": "Noon", "value": 0},
        {"hour": "1 PM", "value": 0},
        {"hour": "2 PM", "value": 0},
        {"hour": "3 PM", "value": 0},
        {"hour": "4 PM", "value": 0},
        {"hour": "5 PM", "value": 0},
        {"hour": "6 PM", "value": 0},
        {"hour": "7 PM", "value": 0},
        {"hour": "8 PM", "value": 0},
        {"hour": "9 PM", "value": 0},
        {"hour": "10 PM", "value": 0},
        {"hour": "11 PM", "value": 0},
    ]


    if (ride_service == 'Uber') {
        console.log('Inside Uber')
        for (let i = 0; i < uber_rides.length; i++) {
            
            if(typeof uber_rides[i] === 'undefined' || typeof uber_rides[i].date === 'undefined' || typeof uber_rides[i].time === 'undefined')
            {
                continue;
            }

            //preparsed time
            PPTime = uber_rides[i].time;
            //console.log("Preparsed Time: "+ PPTime)
            var time = "";
            for(let j = 0; j < PPTime.length; j++)
            {
                //get only the hour
                if(PPTime[j] == ":")
                {
                    break;
                }
                else
                {
                    time += PPTime[j];
                }
                
            }
            //console.log("Time After Parsing: " + time);

            //console.log(busiest_time[parseInt(time)].value);
            busiest_time[parseInt(time)].value++;
        }
    }
    
    else 
    {
        console.log('Inside Other')
        for (let i = 0; i < fhv_rides.length; i++) {
            if(typeof fhv_rides[i] === 'undefined' || typeof fhv_rides[i].date === 'undefined' || typeof fhv_rides[i].time === 'undefined')
            {
                continue;
            }

            if(fhv_rides[i].name != ride_service)
            {
                continue;
            }

            //preparsed time
            PPTime = fhv_rides[i].time;
            //console.log("Preparsed Time: "+ PPTime)
            var time = "";
            for(let j = 0; j < PPTime.length; j++)
            {
                if((j == 0) && (PPTime[j] == "0"))
                {
                    continue;
                }
                //get only the hour
                if(PPTime[j] == ":")
                {
                    break;
                }
                else
                {
                    time += PPTime[j];
                }
                
            }
            //console.log("Time After Parsing: " + time);

            //console.log(busiest_time[parseInt(time)].value);
            busiest_time[parseInt(time)].value++;

        }
    }

    /*console.log("Busiest Time: ");
    busiest_time.forEach(hour => {
        console.log(hour)
    })*/

    return busiest_time;
}

module.exports = { FindBusiestTime, deleteBusiestTime, addBusiestTime };