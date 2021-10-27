const fs = require('fs');
const fileName_1 = "csv_files\\Uber_Rides_1.csv";
const fileName_2 = "csv_files\\Uber_Rides_2.csv";
const fileName_3 = "csv_files\\Uber_Rides_3.csv";
// const fileName_1 = "csv_files\\uber-raw-data-apr14.csv";
// const fileName_2 = "csv_files\\uber-raw-data-aug14.csv";
// const fileName_3 = "csv_files\\uber-raw-data-jul14.csv";
// const fileName_4 = "csv_files\\uber-raw-data-jun14.csv";
// const fileName_5 = "csv_files\\uber-raw-data-may14.csv";
// const fileName_6 = "csv_files\\uber-raw-data-sep14.csv";

//JSON.stringify(object)
//JSON.parse(string)

function ParseUber()
{
    console.log('About to read Uber dataset file...');

    fileData = fs.readFileSync(fileName_1, 'utf8');
    fileData += fs.readFileSync(fileName_2, 'utf8');
    fileData += fs.readFileSync(fileName_3, 'utf8');
    // fileData += fs.readFileSync(fileName_4, 'utf8');
    // fileData += fs.readFileSync(fileName_5, 'utf8');
    // fileData += fs.readFileSync(fileName_6, 'utf8');

    //console.log(fileData);

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
    //writeToFile(file_1, "csv_files\\test_1.csv");
    //writeToFile(file_2, "csv_files\\test_2.csv");
    //writeToFile(file_3, "csv_files\\test_3.csv");

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
            // row = row.replace(/\"/g, '');
            const column = row.split(',');

            //const date_time = column[0];
            const date_time = column[0].split(' ');
            /*
            tempdate = date_time[0];
            //date = date.replace(':00\"','');
            tempdate = tempdate.split('\/');
            const date = tempdate[2] + '-' + tempdate[0] + '-' + tempdate[1];
            */
            // let curr_date = new Date(date_time[0]); 
            // corrected_date = curr_date.toJSON(); //Changing the date to have the year first
            // const date = corrected_date[0] + corrected_date[1] + corrected_date[2] + corrected_date[3] + corrected_date[4] + corrected_date[5] + corrected_date[6] + corrected_date[7] + corrected_date[8] + corrected_date[9]; //Gathering only the necessary values of the date to be stored
            // time = date_time[1];
            // time = time[0]+time[1]+time[2]+time[3];
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


function query()
{

}

module.exports = { ParseUber, parseJSONToCSV };