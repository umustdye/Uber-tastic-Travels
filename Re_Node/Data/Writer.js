var path = require('path');
var fs = require('fs');
var getJSON = require(path.join(__dirname, 'Bao_CSVtoJSON.js'));

var done = 0;

function WriteToFile(filename, JSON_data) {
    //console.log(JSON_data.name);

    var data = JSON.stringify(JSON_data,null,3);
    fs.writeFileSync(filename,data);
   

}

module.exports = { WriteToFile };