const uber_parser = require('../uber_parser');
const cab_parser = require('../cab_type_parse');
const fhv_parser = require('../fhv_parser');

const uber_test = ['Tests\\test_csvs\\uber_rides_test.csv']
const fhv_test = ['Tests\\test_csvs\\fhv_rides_test.csv']
const cab_test = ['Tests\\test_csvs\\cab_rides_test.csv']

uber_data = uber_parser.ParseUber(uber_test);
fhv_data = fhv_parser.Parsefhv(fhv_test);
cab_data = cab_parser.ParseCab_Rides(cab_test);

test('Read in uber csv and check 1st element\'s contents', () => {
  expect(uber_data[0].date).toBe('2014-04-01');
  expect(uber_data[0].time).toBe('0:01');
  expect(uber_data[0].latitude).toBe('40.769');
  expect(uber_data[0].longitude).toBe('-73.9549');
  expect(uber_data[0].base).toBe('B02512');
  expect(uber_data[0].identifier).toBe('0');
});

test('Read in uber csv and check last element\'s contents', () => {
    expect(uber_data[8].date).toBe('2014-09-21');
    expect(uber_data[8].time).toBe('0:21');
    expect(uber_data[8].latitude).toBe('40.7524');
    expect(uber_data[8].longitude).toBe('-73.996');
    expect(uber_data[8].base).toBe('B02512');
    expect(uber_data[8].identifier).toBe('8');
});

test('Read in fhv csv and check 1st element\'s contents', () => {
    expect(fhv_data[0].date).toBe('2014-07-01');
    expect(fhv_data[0].time).toBe('00:00');
    expect(fhv_data[0].address).toBe('Location Aurek');
    expect(fhv_data[0].name).toBe('Prestige');
    expect(fhv_data[0].identifier).toBe('0');
  });
  
test('Read in fhv csv and check last element\'s contents', () => {
    expect(fhv_data[49].date).toBe('2014-09-30');
    expect(fhv_data[49].time).toBe('00:04');
    expect(fhv_data[49].address).toBe('5234 Location Ave Place');
    expect(fhv_data[49].name).toBe('Diplo');
    expect(fhv_data[49].identifier).toBe('49');
});

test('Read in cab csv and check 1st element\'s contents', () => {
    expect(cab_data[0].distance).toBe('0.00');
    expect(cab_data[0].cab_type).toBe('Lyft');
    expect(cab_data[0].destination).toBe('Northeastern University');
    expect(cab_data[0].source).toBe('Back Bay');
    expect(cab_data[0].price).toBe('0.5');
    expect(cab_data[0].name).toBe('Lux Black XL');
    expect(cab_data[0].identifier).toBe('0');
});

test('Read in cab csv and check last element\'s contents', () => {
    expect(cab_data[9].distance).toBe('10.00');
    expect(cab_data[9].cab_type).toBe('Lyft');
    expect(cab_data[9].destination).toBe('Northeastern University');
    expect(cab_data[9].source).toBe('Back Bay');
    expect(cab_data[9].price).toBe('100');
    expect(cab_data[9].name).toBe('Shared');
    expect(cab_data[9].identifier).toBe('9');
});

