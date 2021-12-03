var readFS = require('fs');

//Read in CSV file and returning array of JSON objects.
function CSVtoJSON(data) {

    var line = data.split("\n");

    var result = [];

    for (var j = 0; j < line.length; ++j) {
        line[j] = line[j].replace(/(\r\n|\n|\r)/gm, "");
    }

    var header = line[0].split(",");

    for (var i = 1; i < line.length; ++i) {
        var object = {};
        var row = line[i].split(",");
        if (typeof row == "undefined") {
            console.log("Error");
        }

        for (var j = 0; j < header.length; ++j) {
            if (typeof row[j] == "undefined") {
                console.log("Element undefined in row" + i);
            }
            else {
                object[header[j]] = row[j];
            }
        }

        result.push(object);
    }

    return result;
}

//Analytic on # of uber vs. lyft cars and total cars.
function cab_type(data) {

    var final_data = data;
    var num_uber = 0, num_lyft = 0;

    for (var i = 0; i < final_data.length; ++i) {
        if (typeof final_data[i] === 'undefined' || typeof final_data[i].identifier === 'undefined')
        {
            continue;
        }
        if (final_data[i].cab_type == "Uber") {
            ++num_uber;
        }
        else {
            ++num_lyft;
        }
    }

    const obj = {
        "Uber": num_uber, "Lyft": num_lyft, "Total": (num_lyft + num_uber)
    };

    return obj;
}

//Analytic on price per mile of what cab type (uber vs. lyft) and how expensive or cheap the cab services are.

const low_lyftPPM = new Map();
const low_uberPPM = new Map();
const high_lyftPPM = new Map();
const high_uberPPM = new Map();

function cab_price_calc(data) {
    var final_data = data;

    var PPM;

    for (let i = 0; i < final_data.length; ++i) {
        if(typeof final_data[i] === 'undefined' || typeof final_data[i].identifier === 'undefined')
        {
            continue;
        }
        PPM = final_data[i].price / final_data[i].distance;
        if (final_data[i].cab_type == "Uber") {
            if (!low_uberPPM.has(final_data[i].name)) {
                low_uberPPM.set(final_data[i].name, PPM);
                high_uberPPM.set(final_data[i].name, PPM);
            }
            else if (low_uberPPM.has(final_data[i].name)) {
                if (low_uberPPM.get(final_data[i].name) > PPM) {
                    low_uberPPM.set(final_data[i].name, PPM);
                }
                if (high_uberPPM.get(final_data[i].name) < PPM) {
                    high_uberPPM.set(final_data[i].name, PPM);
                }
            }
        }
        else {
            if (!low_lyftPPM.has(final_data[i].name)) {
                low_lyftPPM.set(final_data[i].name, PPM);
                high_lyftPPM.set(final_data[i].name, PPM);
            }
            else if (low_lyftPPM.has(final_data[i].name)) {
                if (low_lyftPPM.get(final_data[i].name) > PPM) {
                    low_lyftPPM.set(final_data[i].name, PPM);
                }
                if (high_lyftPPM.get(final_data[i].name) < PPM) {
                    high_lyftPPM.set(final_data[i].name, PPM);
                }
            }
        }
    }
}

function cab_price_add(name, price, distance, cab_type) {
    var PPM;

    PPM = price / distance;
    if (cab_type == "Uber") {
        if (!low_uberPPM.has(name)) {
            low_uberPPM.set(name, PPM);
            high_uberPPM.set(name, PPM);
        }
        else if (low_uberPPM.has(name)) {
            if (low_uberPPM.get(name) > PPM) {
                low_uberPPM.set(name, PPM);
            }
            if (high_uberPPM.get(name) < PPM) {
                high_uberPPM.set(name, PPM);
            }
        }
    }
    else {
        if (!low_lyftPPM.has(name)) {
            low_lyftPPM.set(name, PPM);
            high_lyftPPM.set(name, PPM);
        }
        else if (low_lyftPPM.has(name)) {
            if (low_lyftPPM.get(name) > PPM) {
                low_lyftPPM.set(name, PPM);
            }
            if (high_lyftPPM.get(name) < PPM) {
                high_lyftPPM.set(name, PPM);
            }
        }
    }
}

function cab_price() {
    const result = [];

    var low = [];
    var high = [];
    for (var i of low_lyftPPM.keys()) {
        var obj = {};
        obj = { "Cab_Type": "Lyft", "Name": i, "PPM": low_lyftPPM.get(i) };
        low.push(obj);
    }

    for (var i of high_lyftPPM.keys()) {
        var obj = {};
        obj = { "Cab_Type": "Lyft", "Name": i, "PPM": high_lyftPPM.get(i) };
        high.push(obj);
    }

    for (var i = 0; i < low.length; ++i) {
        var obj = {};
        obj = { "Cab_Type": "Lyft", "Name": low[i].Name, "Lowest_price": low[i].PPM, "Highest_price": high[i].PPM };
        result.push(obj);
    }

    var low = new Array();
    var high = new Array();

    for (var i of low_uberPPM.keys()) {
        var obj = {};
        obj = { "Cab_Type": "Uber", "Name": i, "PPM": low_uberPPM.get(i) };
        low.push(obj);
    }

    for (var i of high_uberPPM.keys()) {
        var obj = {};
        obj = { "Cab_Type": "Uber", "Name": i, "PPM": high_uberPPM.get(i) };
        high.push(obj);
    }

    for (var i = 0; i < low.length; ++i) {
        var obj = {};
        obj = { "Cab_Type": "Uber", "Name": low[i].Name, "Lowest_price": low[i].PPM, "Highest_price": high[i].PPM };
        result.push(obj);
    }

    return result;
}

//Just show an overview of the most picked source and destination, the data doesn't correlate with each other in any way.
//will add another analytic where both data correlate with each other.
var dest = new Map();
var src = new Map();
function popular_destination_boston(data) {
    dest = new Map();
    src = new Map();
    var result = [];
    for (let i = 0; i < data.length; ++i) {
        if (!dest.has(data[i].destination)) {
            dest.set(data[i].destination, 1);
        }
        else {
            dest.set(data[i].destination, dest.get(data[i].destination) + 1);
        }

        if (!src.has(data[i].source)) {
            src.set(data[i].source, 1);
        }
        else {
            src.set(data[i].source, src.get(data[i].source) + 1);
        }
    }

    for (var i of dest.keys()) {
        var obj = {};
        obj = { "Location": i, "Count": dest.get(i), "Type": "Destination" };
        result.push(obj);
    }

    for (var i of src.keys()) {
         var obj = {};
         obj = { "Location": i, "Count": src.get(i), "Type": "Source" };
         result.push(obj);
    }
    // for (var i of src.keys()) {
    //     var obj = {};
    //     obj = { "Source": i, "Count": src.get(i) }
    //     result.push(obj);
    // }

    return result;
}


function add_popular_destination_boston(result, source, destination) {
        dest.set(destination, dest.get(destination) + 1);
        for(let i = 0; i<result.length; i++)
        {
            if(result[i].Type == "Destination" && (result[i].Location == destination))
            {
                result[i].Count = dest.get(destination);
                //console.log(result[i]);
            }
        }


        src.set(source, src.get(source) + 1);
        for(let i = 0; i<result.length; i++)
        {
            if(result[i].Type == "Source" && (result[i].Location == source))
            {
                result[i].Count = src.get(source);
                //console.log(result[i])
            }
        }


    return result;
}



function delete_popular_destination_boston(result, source, destination) {
    if(dest.get(destination) == 0)
    {
        dest.set(destination, 0);  
    }

    else
    {
        dest.set(destination, dest.get(destination) - 1);  
    }
    
    
    for(let i = 0; i<result.length; i++)
    {
        if(result[i].Type == "Destination" && (result[i].Location == destination))
        {
            result[i].Count = dest.get(destination);
            //console.log(result[i]);
        }
    }


    
    if(src.get(source) == 0)
    {
        src.set(source, 0);
    }

    else
    {
        src.set(source, src.get(source) - 1);
    }

    for(let i = 0; i<result.length; i++)
    {
        if(result[i].Type == "Source" && (result[i].Location == source))
        {
            result[i].Count = src.get(source);
            //console.log(result[i])
        }
    }


return result;
}







//maps out which source goes to which destination and output a list of popular "route" (source to destination).
popular_routes_data = []
function popular_routes_calc(data) {
    for (var i = 0; i < data.length; ++i) {
        if(typeof data[i] === 'undefined' || typeof data[i].identifier === 'undefined')
        {
            continue;
        }
        var new_src = 0;
        var new_dest = 0;
        var obj = {};
        if (popular_routes_data.length == 0) {
            obj = { "source": data[i].source, "destination": data[i].destination, "count": 1 }
            popular_routes_data.push(obj);  
        }
        else {
            for (var j = 0; j < popular_routes_data.length; ++j) {
                if (popular_routes_data[j].source == data[i].source) {
                    new_src = 1;
                    if (popular_routes_data[j].destination == data[i].destination) {
                        new_dest = 1;
                        popular_routes_data[j].count = popular_routes_data[j].count + 1;
                        break;
                    }
                }
            }
            //new source
            if (new_src == 0 || new_dest == 0) {
                obj = { "source": data[i].source, "destination": data[i].destination, "count": 1 }
                popular_routes_data.push(obj);
            }
        }
    }
}

function popular_routes_add(source, destination) {
    var new_src = 0;
    var new_dest = 0;
    var obj = {};
    if (popular_routes_data.length == 0) {
        obj = { "source": source, "destination": destination, "count": 1 }
        popular_routes_data.push(obj);  
    }
    else {
        for (var j = 0; j < popular_routes_data.length; ++j) {
            if (popular_routes_data[j].source == source) {
                new_src = 1;
                if (popular_routes_data[j].destination == destination) {
                    new_dest = 1;
                    popular_routes_data[j].count = popular_routes_data[j].count + 1;
                    break;
                }
            }
        }
        //new source
        if (new_src == 0 || new_dest == 0) {
            obj = { "source": source, "destination": destination, "count": 1 }
            popular_routes_data.push(obj);
        }
    }
}

function popular_routes_subtract(source, destination) {
    if (popular_routes_data.length == 0) {
        return -1; 
    }
    else {
        for (var j = 0; j < popular_routes_data.length; ++j) {
            if (popular_routes_data[j].source == source) {
                if (popular_routes_data[j].destination == destination) {
                    popular_routes_data[j].count = popular_routes_data[j].count - 1;
                    break;
                }
            }
        }
    }
}

function popular_routes(data) {
    return popular_routes_data;
}

module.exports = { CSVtoJSON, cab_type, cab_price, cab_price_calc, cab_price_add, popular_destination_boston, add_popular_destination_boston, delete_popular_destination_boston, popular_routes, popular_routes_calc, popular_routes_add, popular_routes_subtract };
