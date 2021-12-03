const fs = require('fs');

//JSON.stringify(object)
//JSON.parse(string)

function ParseCab_Rides(fileNames)
{
    var fileData = '';
    console.log('About to read cab_rides dataset file...');

    for (let i = 0; i < fileNames.length; i++) {
        fileData += fs.readFileSync(fileNames[i], 'utf8');
    }

    //console.log(fileData);

    //array of each row as JSON object
    cab_rides_Obj = parseCSVToJSON(fileData);
    //console.log(Uber_Obj[0])


    console.log('Finished reading in cab_rides dataset');
    return cab_rides_Obj
}




//parse function
function parseToJSON(data)
{

}


//pass in fileData
function parseCSVToJSON(data)
{
    const cab_rides = [];

    //const rows = data.split('\n');
    //if first row are headers
    //rows = data.split('\n').slice(1);
    rows = data.split('\n');
    rows = rows.slice(1);
    


    //parse each row and separate by commas
    //split into JSON obj
    rows.forEach(row => {
        if(typeof row === 'undefined')
        {
            console.log("Item is not defined...")
        }

        else
        {
            row = row.replace(/\"/g, '');
            row = row.replace(/(\r)/gm, '');
            const column = row.split(',');
            const distance = column[0];
            const cab_type = column[1];
            const time_stamp = column[2];
            const destination = column[3];
            const source = column[4];
            const price = column[5];
            const surge_multiplier = column[6];
            const id = column[7];
            const product_id = column[8];
            const name = column[9];
            const identifier = column[10];
            const data = {"distance":distance, "cab_type":cab_type, "time_stamp":time_stamp, "destination":destination, "source":source, "price":price, "surge_multiplier":surge_multiplier, "id":id, "product_id":product_id, "name":name, "identifier":identifier};
            cab_rides.push(data);
            }

    });
    // console.log(cab_rides)
    return cab_rides;

}

//parse function annd write to file
function parseJSONToCSV(data, fileNames)
{
    console.log("Writing Cab Dataset to file...");
    //Date,Time,Address,Name,Identifier
    file = "distance,cab_type,time_stamp,destination,source,price,surge_multiplier,id,product_id,name,identifier";
    index = 0;
    for (let i = 0; i < data.length; i++)
    {
        if(typeof cab_rides[i] === 'undefined' || typeof cab_rides[i].identifier === 'undefined' || typeof cab_rides[i].source === 'undefined' || typeof cab_rides[i].destination === 'undefined' || typeof cab_rides[i].name === 'undefined')
        {
            continue;
        }
        //console.log(data[i])
        //Prestige, Highclass, Firstclass, Diplo, American
        file += "\n" + data[i].distance + ',' + data[i].cab_type + ',' + data[i].time_stamp + ',' + data[i].destination + ',' + data[i].source + ',' + data[i].price + ',' + data[i].surge_multiplier + ',' + data[i].id + ',' + data[i].product_id + ',' + data[i].name + ',' + index;
        index++;

    }
    // filename = "csv_files\\cab_rides.csv"
    //filename = "csv_files\\test.csv"

    fs.writeFile(fileNames[0], file, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })

      console.log('Save Complete')

}



function findLyft(lyft, identifier)
{
    for(let i=0; i<lyft.length; i++)
    {
        if(typeof lyft[i] === 'undefined' || typeof lyft[i].identifier === 'undefined')
        {
            console.log("Item is not defined...")
        }

        else
        {
            if(lyft[i].identifier == identifier )
            {
                return lyft[i];
            }
        }
    }
}


module.exports = { ParseCab_Rides, parseJSONToCSV, findLyft };
