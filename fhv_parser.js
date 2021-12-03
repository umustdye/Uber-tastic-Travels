const fs = require('fs');

function Parsefhv(fileNames)
{
    var fileData = '';
    console.log('About to read fhv dataset file...');

    for (let i = 0; i < fileNames.length; i++) {
        fileData += fs.readFileSync(fileNames[i], 'utf8');
    }
    //array of each row as JSON object
    fhv_Obj = []
    fhv_Obj = parseCSVToJSON(fileData, /*fhv_names[0],*/ fhv_Obj);
    //console.log(fhv_Obj[0]);

    console.log('Finished reading in fhv dataset');
    return fhv_Obj
}

//parse function annd write to file
function parseJSONToCSV(data, fileNames)
{
    console.log("Writing fhv Dataset to file...");
    //Date,Time,Address,Name,Identifier
    file = "Date,Time,Address,Name,Identifier";
    index = 0;
    for (let i = 0; i < data.length; i++)
    {
        //console.log(data[i])
        //Prestige, Highclass, Firstclass, Diplo, American
        // if((i>0) && ((data[i-1].name == "Prestige" && data[i].name == "Highclass") || (data[i-1].name == "Highclass" && data[i].name == "Firstclass") || (data[i-1].name == "Firstclass" && data[i].name == "Diplo") || (data[i-1].name == "Diplo" && data[i].name == "American")))
        // {
        //     index = 0;
        // }
        file += "\n" + data[i].date + ',' + data[i].time + ',' + data[i].address + ',' + data[i].name + ',' + index;
        index++;

    }

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
            const column = row.split(',');
            const date = column[0];
            const time = column[1]
            const address = column[2];
            const name = column[3];
            const identifier = column[4].replace(/(\r)/gm, "");
            const data = {"date":date, "time":time, "address":address, "name":name, "identifier":identifier};
            fhv.push(data);
        }

    });

    //console.log(Uber);
    return fhv;

}



module.exports = { Parsefhv, parseJSONToCSV };