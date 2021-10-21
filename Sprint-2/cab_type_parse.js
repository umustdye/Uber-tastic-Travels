const fs = require('fs');
const fileName = "csv_files\\cab_rides.csv";

//JSON.stringify(object)
//JSON.parse(string)

function ParseCab_Rides()
{
    console.log('About to read cab_rides dataset file...');

    fileData = fs.readFileSync(fileName, 'utf8');

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

//unparse
function parseToObject(data)
{
    /*
    $(jQuery.parseJSON(JSON.stringify(dataArray))).each(function() {  
    var ID = this.id;
    var TITLE = this.Title;
    }); 
    or
    $(jQuery.parseJSON(dataArray)).each(function() {  
    var ID = this.id;
    var TITLE = this.Title;
    });
*/
 
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
            const data = {"distance":distance, "cab_type":cab_type, "time_stamp":time_stamp, "destination":destination, "source":source, "price":price, "surge_multiplier":surge_multiplier, "id":id, "product_id":product_id, "name":name};
            cab_rides.push(data);
            }

    });

    return cab_rides;

}


module.exports = { ParseCab_Rides };