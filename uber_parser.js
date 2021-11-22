const fs = require('fs');
const fileName_1 = "csv_files\\Uber_Rides_1.csv";
const fileName_2 = "csv_files\\Uber_Rides_2.csv";
const fileName_3 = "csv_files\\Uber_Rides_3.csv";

function ParseUber()
{
    console.log('About to read Uber dataset file...');

    fileData = fs.readFileSync(fileName_1, 'utf8');
    fileData += fs.readFileSync(fileName_2, 'utf8');
    fileData += fs.readFileSync(fileName_3, 'utf8');

    //array of each row as JSON object
    Uber_Obj = parseCSVToJSON(fileData);
    //console.log(Uber_Obj[0])


    console.log('Finished reading in Uber dataset');
    return Uber_Obj
}




//parse function annd write to file
function parseJSONToCSV(data)
{
    console.log("Writing Uber Dataset to file...");
    //Date,Time,Latitude,Longitude,Base,Identifier
    file_1 = "Date,Time,Latitude,Longitude,Base,Identifier";
    file_2 = "Date,Time,Latitude,Longitude,Base,Identifier";
    file_3 = "Date,Time,Latitude,Longitude,Base,Identifier";
    //filename_1 = 0 - 199,999
    //filename_2 = 2,000,000 - 3,999,999
    //filename_3 = 4,000,000 - ?
    //var tmpFile
    for (let i = 0; i < data.length; i++)
    {
        if((i >= 0) && (i <= 1999999))
        {
            file_1 += "\n" + data[i].date + ',' + data[i].time + ',' + data[i].latitude + ',' + data[i].longitude + ',' + data[i].base + ',' + i;
        }
        
        else if((i >= 2000000) && (i <= 3999999))
        {
            file_2 += "\n" + data[i].date + ',' + data[i].time + ',' + data[i].latitude + ',' + data[i].longitude + ',' + data[i].base + ',' + i;
        }

        //4,000,000 or larger
        else
        {
            file_3 += "\n" + data[i].date + ',' + data[i].time + ',' + data[i].latitude + ',' + data[i].longitude + ',' + data[i].base + ',' + i;
        }
    }

    writeToFile(file_1, fileName_1);
    writeToFile(file_2, fileName_2);
    writeToFile(file_3, fileName_3);
    console.log('Save Complete')
}


function writeToFile(data, fileName)
{
    fs.writeFile(fileName, data, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
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
            // row = row.replace(/\"/g, '');
            const column = row.split(',');
            const date = column[0];
            const time = column[1];
            const latitude = column[2];
            const longitude = column[3];
            const base = column[4];
            const identifier = column[5];
            const data = {"date":date, "time":time, "latitude":latitude, "longitude":longitude, "base":base, "identifier":identifier};
            Uber.push(data);
            }

    });

    return Uber;

}


function findUber(uber, identifier)
{
    for(let i=0; i<uber.length; i++)
    {
        if(typeof uber[i] === 'undefined' || typeof uber[i].identifier === 'undefined')
        {
            console.log("Item is not defined...")
        }

        else
        {
            if(uber[i].identifier == identifier )
            {
                return uber[i];
            }
        }
    }
}

module.exports = { ParseUber, parseJSONToCSV, parseCSVToJSON, findUber };