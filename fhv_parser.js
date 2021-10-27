const fs = require('fs');
const fileName = "csv_files\\FHV_Rides.csv";
// const fileName_1 = "csv_files\\other-Prestige_B01338.csv";
// const fileName_2 = "csv_files\\other-Highclass_B01717.csv";
// const fileName_3 = "csv_files\\other-Firstclass_B01536.csv";
// const fileName_4 = "csv_files\\other-Diplo_B01196.csv";
// const fileName_5 = "csv_files\\other-American_B01362.csv";

// var fhv_names = ['Prestige', 'Highclass', 'Firstclass', 'Diplo', 'American'];


//JSON.stringify(object)
//JSON.parse(string)

function Parsefhv()
{
    console.log('About to read fhv dataset file...');

    fileData = fs.readFileSync(fileName, 'utf8').slice(1);
    // fileData1 = fs.readFileSync(fileName_2, 'utf8').slice(1);
    // fileData2 = fs.readFileSync(fileName_3, 'utf8').slice(1);
    // fileData3 = fs.readFileSync(fileName_4, 'utf8').slice(1);
    // fileData4 = fs.readFileSync(fileName_5, 'utf8').slice(1);

    //console.log(fileData);

    //array of each row as JSON object
    fhv_Obj = []
    fhv_Obj = parseCSVToJSON(fileData, /*fhv_names[0],*/ fhv_Obj);
    // fhv_Obj = parseCSVToJSON(fileData1, fhv_names[1], fhv_Obj);
    // fhv_Obj = parseCSVToJSON(fileData2, fhv_names[2], fhv_Obj);
    // fhv_Obj = parseCSVToJSON(fileData3, fhv_names[3], fhv_Obj);
    // fhv_Obj = parseCSVToJSON(fileData4, fhv_names[4], fhv_Obj);

    //console.log(fhv_Obj[0]);


    console.log('Finished reading in Uber dataset');
    return fhv_Obj
}




// function convertTo24Hr (toConvert) {
//     if(typeof toConvert !== 'undefined')
//     {
//         if (toConvert.includes('AM')) {
//         if ((toConvert[0] == 1) && (toConvert[1] == 2)) { //12 AM
//             converted = '00:' + toConvert[3] + toConvert[4];
//             return converted;
//         }
//         else if ((toConvert[0] == 1) && (toConvert[1] == 1)) { //11 AM
//             converted = '11:' + toConvert[3] + toConvert[4];
//             return converted;
//         }
//         else if ((toConvert[0] == 1) && (toConvert[1] == 0)) { //10 AM
//             converted = '10:' + toConvert[3] + toConvert[4];
//             return converted;
//         }
//         else if ((toConvert[0] == 9)) { //9 AM
//             converted = '09:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 8)) { //8 AM
//             converted = '08:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 7)) { //7 AM
//             converted = '07:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 6)) { //6 AM
//             converted = '06:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 5)) { //5 AM
//             converted = '05:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 4)) { //4 AM
//             converted = '04:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 3)) { //3 AM
//             converted = '03:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 2)) { //2 AM
//             converted = '02:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else { //1 AM
//             converted = '01:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//     }
//     else {
//         if ((toConvert[0] == 1) && (toConvert[1] == 2)) { //12 PM
//             converted = '12:' + toConvert[3] + toConvert[4];
//             return converted;
//         }
//         else if ((toConvert[0] == 1) && (toConvert[1] == 1)) { //11 PM
//             converted = '23:' + toConvert[3] + toConvert[4];
//             return converted;
//         }
//         else if ((toConvert[0] == 1) && (toConvert[1] == 0)) { //10 PM
//             converted = '22:' + toConvert[3] + toConvert[4];
//             return converted;
//         }
//         else if ((toConvert[0] == 9)) { //9 PM
//             converted = '21:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 8)) { //8 PM
//             converted = '20:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 7)) { //7 PM
//             converted = '19:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 6)) { //6 PM
//             converted = '18:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 5)) { //5 PM
//             converted = '17:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 4)) { //4 PM
//             converted = '16:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 3)) { //3 PM
//             converted = '15:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else if ((toConvert[0] == 2)) { //2 PM
//             converted = '14:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//         else { //1 PM
//             converted = '13:' + toConvert[2] + toConvert[3];
//             return converted;
//         }
//     } 
//     }

// }


//parse function annd write to file
function parseJSONToCSV(data)
{
    console.log("Writing fhv Dataset to file...");
    //Date,Time,Address,Name,Identifier
    file = "Date,Time,Address,Name,Identifier";
    index = 0;
    for (let i = 0; i < data.length; i++)
    {
        //console.log(data[i])
        //Prestige, Highclass, Firstclass, Diplo, American
        if((i>0) && ((data[i-1].name == "Prestige" && data[i].name == "Highclass") || (data[i-1].name == "Highclass" && data[i].name == "Firstclass") || (data[i-1].name == "Firstclass" && data[i].name == "Diplo") || (data[i-1].name == "Diplo" && data[i].name == "American")))
        {
            index = 0;
        }
        file += "\n" + data[i].date + ',' + data[i].time + ',' + data[i].address + ',' + data[i].name + ',' + index;
        index++;

    }
    filename = "csv_files\\FHV_Rides.csv"
    //filename = "csv_files\\test.csv"

    fs.writeFile(filename, file, err => {
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
function parseCSVToJSON(data, /*name,*/ fhv)
{
    //const rows = data.split('\n');
    //if first row are headers
    
    // data = data.replace('\" ','')
    // data = data.replace('\"','')
    //rows = data.split('\n').slice(1);
    rows = data.split('\n').slice(1);
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
            /*
            tempdate = column[0];
            tempdate = tempdate.split('\/');
            const date = tempdate[2] + '-' + tempdate[0] + '-' + tempdate[1];*/
            // let curr_date = new Date(column[0]); 
            // corrected_date = curr_date.toJSON(); //Changing the date to have the year first
            // const date = corrected_date[0] + corrected_date[1] + corrected_date[2] + corrected_date[3] + corrected_date[4] + corrected_date[5] + corrected_date[6] + corrected_date[7] + corrected_date[8] + corrected_date[9]; //Gathering only the necessary values of the date to be stored
            // const time = convertTo24Hr(column[1]); //converting time to 24 hr time 
            const date = column[0];
            const time = column[1]
            const address = column[2];
            const name = column[3];
            const identifier = column[4];
            const data = {"date":date, "time":time, "address":address, "name":name, "identifier":identifier};
            fhv.push(data);
        }

    });

    //console.log(Uber);
    return fhv;

}



module.exports = { Parsefhv, parseJSONToCSV };