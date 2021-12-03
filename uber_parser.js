const fs = require('fs');

function ParseUber(fileNames)
{
    var fileData = '';
    console.log('About to read Uber dataset file...');
    for (let i = 0; i < fileNames.length; i++) {
        fileData += fs.readFileSync(fileNames[i], 'utf8');
    }
    //array of each row as JSON object
    Uber_Obj = parseCSVToJSON(fileData);
    //console.log(Uber_Obj[0])


    console.log('Finished reading in Uber dataset');
    return Uber_Obj
}




//parse function annd write to file
function parseJSONToCSV(data, fileNames)
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

    writeToFile(file_1, fileNames[0]);
    writeToFile(file_2, fileNames[1]);
    writeToFile(file_3, fileNames[2]);
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

            var time = '0';
            if (column[1].length <= 4) {
                time += column[1];
            }
            else {
                time = column[1];
            }

            var latitude = column[2];

            if (latitude[0] == '-') {
                while (latitude.length < 8) {
                    latitude += '0';
                }
            }
            else {
                while (latitude.length < 7) {
                    latitude += '0';
                }
            }
            
            var longitude = column[3];
            if (longitude[0] == '-') {
                while (longitude.length < 8) {
                    longitude += '0';
                }
            }
            else {
                while (longitude.length < 7) {
                    longitude += '0';
                }
            }

            const base = column[4];
            const identifier = column[5].replace(/(\r)/gm, "");
            
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