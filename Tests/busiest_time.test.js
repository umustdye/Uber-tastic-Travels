const uber_parser = require('../uber_parser');
const fhv_parser = require('../fhv_parser');
const busiest_time = require('../busiest_time.js');

const uber_test = ['Tests\\test_csvs\\uber_rides_test.csv']
const fhv_test = ['Tests\\test_csvs\\fhv_rides_test.csv']


uber_data = uber_parser.ParseUber(uber_test);
fhv_data = fhv_parser.Parsefhv(fhv_test);


test('Check the busiest time for uber for hour that exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Uber")
  //Midnight
  expect(jObj[0].value).toBe(9);
  
});

test('Check the busiest time for uber for hour that DOES NOT exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Uber")
  //1 AM
  expect(jObj[1].value).toBe(0);
  
});



test('Check the busiest time for American for hour that exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "American")
  //Midnight
  expect(jObj[0].value).toBe(10);
  
});

test('Check the busiest time for American for hour that DOES NOT exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "American")
  //1 AM
  expect(jObj[1].value).toBe(0);
  
});



test('Check the busiest time for Diplo for hour that exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Diplo")
  //Midnight
  expect(jObj[0].value).toBe(10);
  
});

test('Check the busiest time for American for hour that DOES NOT exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Diplo")
  //1 AM
  expect(jObj[1].value).toBe(0);
  
});


test('Check the busiest time for Highclass for hour that exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Highclass")
  //Midnight
  expect(jObj[0].value).toBe(10);
  
});

test('Check the busiest time for Highclass for hour that DOES NOT exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Highclass")
  //1 AM
  expect(jObj[1].value).toBe(0);
  
});



test('Check the busiest time for Firstclass for hour that exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Firstclass")
  //Midnight
  expect(jObj[0].value).toBe(10);
  
});

test('Check the busiest time for Firstclass for hour that DOES NOT exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Firstclass")
  //1 AM
  expect(jObj[1].value).toBe(0);
  
});


test('Check the busiest time for Prestige for hour that exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Prestige")
  //Midnight
  expect(jObj[0].value).toBe(10);
  
});

test('Check the busiest time for Prestige for hour that DOES NOT exists', () => {
  jObj = busiest_time.FindBusiestTime(uber_data, fhv_data, "Prestige")
  //1 AM
  expect(jObj[1].value).toBe(0);
  
});