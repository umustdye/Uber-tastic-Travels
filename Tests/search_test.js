const uber_parser = require('../uber_parser');
const cab_parser = require('../cab_type_parse');
const fhv_parser = require('../fhv_parser');
const noah_analytic = require('../Noah_Parse');

const uber_test = ['Tests\\test_csvs\\uber_rides_test.csv']
const fhv_test = ['Tests\\test_csvs\\fhv_rides_test.csv']
const cab_test = ['Tests\\test_csvs\\cab_rides_test.csv']

uber_data = uber_parser.ParseUber(uber_test);
fhv_data = fhv_parser.Parsefhv(fhv_test);
cab_data = cab_parser.ParseCab_Rides(cab_test);

//Check the returned result is accurate (Uber, Lyft, FHV)
//Check FHV results with/without text
//Check what is returned if element in null (Uber, Lyft, FHV)