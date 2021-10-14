const fs = require('fs');
const fileName = "archive\\uber-raw-data-apr14.csv";

//JSON.stringify(object)
//JSON.parse(string)

function ParseUber()
{
    console.log('About to read Uber dataset file...');

    const fileData = fs.readFileSync(fileName, 'utf8');

    //console.log(fileData);

    //array of each row as JSON object
    Uber_Obj = parseCSVToJSON(fileData);

    //console.log(Uber_Obj);


    console.log('Finished reading in Uber dataset');
    return Uber_Obj
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
    const Uber = [];

    //const rows = data.split('\n');
    //if first row are headers
    const rows = data.split('\n').slice(1);

    //parse each row and separate by commas
    //split into JSON obj
    rows.forEach(row => {
        if(typeof row === 'undefined')
        {
            console.log("Item is not defined...")
        }

        else
        {
            const column = row.split(',');
            const date_time = column[0];
            const lat = column[1];
            const lon = column[2];
            const base = column[3];
            const data = {"date_time":date_time, "lat":lat, "lon":lon, "base":base};
            Uber.push(data);
        }

    });

    return Uber;

}


function query()
{

}

module.exports = { ParseUber };