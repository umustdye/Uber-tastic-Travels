const Unit = require('./Bao_UnitTest.js');

//Read in file correctly
test('Properly read in csv file and convert it to json', () => {
    //var data = Unit.parse_mock_csv();
    var array = [];
    var sourceCount = 1;
    var distance = 0.44;
    var price = 12.3341;
    var source = "Source";

    for (var i = 0; i < 5; ++i) {
        var obj = {}
        obj = { "distance": distance.toString(), "price": price.toString(), "source": source + ' ' + sourceCount.toString(), "destination": "Destination" + ' ' + sourceCount.toString() };
        distance += 0.11;
        price += 1;
        sourceCount += 1;
        array.push(obj);
    }

    obj = { "distance": "0.44", "price": "12.3341", "source": "Source 1", "destination": "Destination 1" };
    array.push(obj);

    expect(Unit.parse_mock_csv()).toEqual(array)
});

//Test division rounding
test('13.44321', () => {
    expect(Unit.division_test(13.44321)).toBe("13.44");
});

//Number starts with 0 is not significant
test('0.3343', () => {
    expect(Unit.division_test(0.3343)).toBe("0.33");
});

test('Popular destination test cases', () => {
    var array = [];
    var obj = {};

    obj = { "source": "Source 1", "destination": "Destination 1", "count": 2 }
    array.push(obj);
    obj = { "source": "Source 2", "destination": "Destination 2", "count": 1 }
    array.push(obj);
    obj = { "source": "Source 3", "destination": "Destination 3", "count": 1 }
    array.push(obj);
    obj = { "source": "Source 4", "destination": "Destination 4", "count": 1}
    array.push(obj);
    obj = { "source": "Source 5", "destination": "Destination 5", "count": 1 }
    array.push(obj);

    expect(Unit.string_compare_test(Unit.parse_mock_csv())).toEqual(array);
});

test('Division rounding test, 13.4321/12.312', () => {
    expect(Unit.division_rounding_test(13.4321, 12.312)).toBe("1.09");
});