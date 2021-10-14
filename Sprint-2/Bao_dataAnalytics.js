var readFS = require('fs');
const readLine = require('readline');

function readCSV() {
    readFS.readFile('/Users/Bao Lam/source/repos/ExpressApp1/ExpressApp1/cab_rides.csv', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        else {

            var element = data.split(',');

            //made arrays for each category so we can access it individually.
            var distance = new Array();
            var cab_type = new Array();
            var time = new Array();
            var destination = new Array();
            var source = new Array();
            var price = new Array();
            var surge_multiplier = new Array();
            var id = new Array();
            var product_id = new Array();
            var name = new Array();
            let i = 9;

            while (i < element.length) {
                var split = new String();
                split = element[i].split('\r');
                if (i != 9) {
                    name.push(split[0]);
                }
                distance.push(split[1]);
                ++i;
                cab_type.push(element[i]);
                ++i;
                time.push(element[i]);
                ++i;
                destination.push(element[i]);
                ++i;
                source.push(element[i]);
                ++i;
                price.push(element[i]);
                ++i;
                surge_multiplier.push(element[i]);
                ++i;
                id.push(element[i]);
                ++i;
                product_id.push(element[i]);
                ++i;
            }

            //deletes all newline
            for (let j = 0; j < distance.length; ++j) {
                distance[j] = distance[j].replace(/(\r\n|\n|\r)/gm, "");
            }

        }

        console.log(distance);

        //Data analytics here
        var num_uber = 0;
        var num_lyft = 0;

        for (let i = 0; i < cab_type.length; ++i) {
            if (cab_type[i] == "Uber") {
                ++num_uber;
            }
            else {
                ++num_lyft;
            }
        }

        console.log("Uber Trips: %d\n", num_uber);
        console.log("Lyft Trips: %d\n", num_lyft);

        //vehicle price per mile between uber and lyft.
        //low represents the cheapest service of the car's make/brand/service type based on the mile per hour.
        //high represents the most expensive service of the car's make/brand/service type based on the mile per hour.
        const low_lyftPPM = new Map();
        const low_uberPPM = new Map();
        const high_lyftPPM = new Map();
        const high_uberPPM = new Map();
        var PPM;

        for (let i = 0; i < cab_type.length; ++i) {
            PPM = price[i] / distance[i];
            if (cab_type[i] == "Uber") {
                if (!low_uberPPM.has(name[i])) {
                    low_uberPPM.set(name[i], PPM);
                    high_uberPPM.set(name[i], PPM);
                }
                else if (low_uberPPM.has(name[i])) {
                    if (low_uberPPM.get(name[i]) > PPM) {
                        low_uberPPM.set(name[i], PPM);
                    }
                    if (high_uberPPM.get(name[i]) < PPM) {
                        high_uberPPM.set(name[i], PPM);
                    }
                }
            }
            else {
                if (!low_lyftPPM.has(name[i])) {
                    low_lyftPPM.set(name[i], PPM);
                    high_lyftPPM.set(name[i], PPM);
                }
                else if (low_lyftPPM.has(name[i])) {
                    if (low_lyftPPM.get(name[i]) > PPM) {
                        low_lyftPPM.set(name[i], PPM);
                    }
                    if (high_lyftPPM.get(name[i]) < PPM) {
                        high_lyftPPM.set(name[i], PPM);
                    }
                }
            }
        }

        const it1 = low_lyftPPM[Symbol.iterator]();
        const it2 = high_lyftPPM[Symbol.iterator]();
        const it3 = low_uberPPM[Symbol.iterator]();
        const it4 = high_uberPPM[Symbol.iterator]();

        console.log("\nCheapest Lyft Services:\n");
        for (const item of it1) {
            console.log(item);
        }

        console.log("\nMost expensive Lyft Services:\n");
        for (const item of it2) {
            console.log(item);
        }

        console.log("\nCheapest uber services: \n")
        for (const item of it3) {
            console.log(item);
        }

        console.log("\nMost expensive uber services:\n");
        for (const item of it4) {
            console.log(item);
        }

        //error checking
        //need more debugging
        var expensive_price = 0;
        for (let i = 0; i < price.length; ++i) {
            if (expensive_price < price[i]) {
                expensive_price = price[i];
            }
        }

        console.log(expensive_price);


        //Most popular source and destination
        const dest_data = new Map();
        const src_data = new Map();
        var temp;

        for (let i = 0; i < distance.length; ++i) {
            if (!dest_data.has(destination[i])) {
                dest_data.set(destination[i], 1);
            }
            else {
                dest_data.set(destination[i], dest_data.get(destination[i]) + 1);
            }

            if (!src_data.has(destination[i])) {
                src_data.set(destination[i], 1);
            }
            else {
                src_data.set(destination[i], src_data.get(destination[i]) + 1);
            }
        }

        const it5 = dest_data[Symbol.iterator]();
        const it6 = src_data[Symbol.iterator]();

        console.log("\nMost popular destinations:\n");
        for (const item of it5) {
            console.log(item);
        }

        console.log("\nMost popular source:\n");
        for (const item of it6) {
            console.log(item);
        }


        //need debugging

    });



}


module.exports = { readCSV };