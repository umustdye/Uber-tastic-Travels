const fs = require('fs');
const filename = "Tests\\test_csvs\\mock_csv.csv"

function parse_mock_csv() {
    fileData = fs.readFileSync(filename, 'utf8');
    obj = CSVtoJSON(fileData);

    return obj;
}

function division_test(data) {
    //want 2 decimals
    //data = float of any length

    
    var hold = data.toString().split('.');
    var size = hold[0].length;

    if (hold[0] == "0") {
        return parseFloat(data).toPrecision(2);
    }
    else {
        return parseFloat(data).toPrecision(size + 2);
    }

    return 0;
}

function string_compare_test(data) {
    var result = [];
    var temp = [];

    for (var i = 0; i < data.length; ++i) {
        var new_src = 0;
        var new_dest = 0;
        var obj = {};
        if (result.length == 0) {
            obj = { "source": data[i].source, "destination": data[i].destination, "count": 1 }
            result.push(obj);
        }
        else {
            for (var j = 0; j < result.length; ++j) {
                if (result[j].source == data[i].source) {
                    new_src = 1;
                    if (result[j].destination == data[i].destination) {
                        new_dest = 1;
                        result[j].count = result[j].count + 1;
                        break;
                    }
                }
            }
            //new source
            if (new_src == 0 || new_dest == 0) {
                obj = { "source": data[i].source, "destination": data[i].destination, "count": 1 }
                result.push(obj);
            }
        }
    }

    return result;
}

function CSVtoJSON(data) {

    var line = data.split("\n");

    var result = [];

    for (var j = 0; j < line.length; ++j) {
        line[j] = line[j].replace(/(\r\n|\n|\r)/gm, "");
    }

    var header = line[0].split(",");

    for (var i = 1; i < line.length; ++i) {
        var object = {};
        var row = line[i].split(",");
        if (typeof row == "undefined") {
            console.log("Error");
        }

        for (var j = 0; j < header.length; ++j) {
            if (typeof row[j] == "undefined") {
                console.log("Element undefined in row" + i);
            }
            else {
                object[header[j]] = row[j];
            }
        }

        result.push(object);
    }

    return result;
}

function division_rounding_test(num, denum) {
    var hold = (num/denum).toString().split('.');
    var size = hold[0].length;

    if (hold[0] == "0") {
        return parseFloat(num/denum).toPrecision(2);
    }
    else {
        return parseFloat(num/denum).toPrecision(size + 2);
    }

    return 0;
}

parse_mock_csv();

module.exports = { parse_mock_csv, division_test, string_compare_test, division_rounding_test };