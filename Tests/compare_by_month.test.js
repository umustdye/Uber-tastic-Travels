const uber_parser = require('../uber_parser');
const cab_parser = require('../cab_type_parse');
const fhv_parser = require('../fhv_parser');
const compare = require('../Noah_Parse');

const uber_test = ['Tests\\test_csvs\\uber_rides_test.csv']
const fhv_test = ['Tests\\test_csvs\\fhv_rides_test.csv']
const cab_test = ['Tests\\test_csvs\\cab_rides_test.csv']

uber_data = uber_parser.ParseUber(uber_test);
fhv_data = fhv_parser.Parsefhv(fhv_test);
cab_data = cab_parser.ParseCab_Rides(cab_test);

//Initialize Counts
compare.updateUberCompareCount(uber_data, 0, 0)
compare.updateFHVCompareCount(fhv_data, 0, 0)

test('Check initialized count for Uber rides with non-zero data for month count', () => {
  jObj = compare.CompareBasedOnMonth('Uber', 'Uber', '2014-04', '2014-04');
  expect(jObj[0].count1).toBe(3);
});

test('Check initialized count for Uber rides with no data for month count', () => {
  jObj = compare.CompareBasedOnMonth('Uber', 'Uber', '2014-07', '2014-07');
  expect(jObj[0].count1).toBe(0);
});

test('Check initialized count for FHV rides with non-zero data for month count', () => {
  jObj = compare.CompareBasedOnMonth('Prestige', 'Diplo', '2014-09', '2014-08');
  expect(jObj[0].count1).toBe(4);
  expect(jObj[0].count2).toBe(3);
});

test('Check initialized count for FHV rides with no data for month count', () => {
  jObj = compare.CompareBasedOnMonth('American', 'Firstclass', '2014-04', '2014-04');
  expect(jObj[0].count1).toBe(0);
  expect(jObj[0].count2).toBe(0);
});