$(function () {
    // GET/pickup
    $('#get-pickup').on('click', function () {
        $.ajax({
            url: '/pickup_date',
            contentType: 'application/json',
            success: function (response) {

                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.uber_date.forEach(function (uber) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="date">' + uber.date + '</td>\
                        <td class="time">' + uber.time + '</td>\
                        <td class="longitude">' + uber.longitude + '</td>\
                        <td class="latitude">' + uber.latitude + '</td>\
                    </tr>\
                ');

                });
            }
        });
    });


    $('#save_uber_ride').on('click', function () {
        $.ajax({
            url: '/save_uber',
            contentType: 'application/json',
            success: function (response) {

                var tbodyEl = $('tbody');

                tbodyEl.html('');
                tbodyEl.append(response);
            }
        });
    });


    $('#save_fhv_ride').on('click', function () {
        $.ajax({
            url: '/save_fhv',
            contentType: 'application/json',
            success: function (response) {

                var tbodyEl = $('tbody');

                tbodyEl.html('');
                tbodyEl.append(response);
            }
        });
    });

    // GET/compare
    $('#compareDiplo').on('click', function () {
        $.ajax({
            url: '/compareDiplo',
            contentType: 'application/json',
            success: function (response) {

                var tbodyEl = $('tbody');

                tbodyEl.html('');
                tbodyEl.append('\
                <tr>\
                    <td class="month">' + "month" + '</td>\
                    <td class="u_rides">' + "Uber Rides" + '</td>\
                    <td class="f_rides">' + response.comparing[0].f_name + " Rides" + '</td>\
                </tr>\
                ');

                response.comparing.forEach(function (compare) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="month">' + compare.month + '</td>\
                        <td class="u_rides">' + compare.u_rides + '</td>\
                        <td class="f_rides">' + compare.f_rides + '</td>\
                    </tr>\
                    ');

                });

            }
        });
    });



    // CREATE/POST
    $('#search_parameters').on('submit', function (event) {
        event.preventDefault();

        var ride_service = $('#ride_service');
        var date_begin = $('#date_begin');
        var date_end = $('#date_end');
        var time_begin = $('#time_begin');
        var time_end = $('#time_end');
        var location = $('#location');
        var search_type = '';

        if ($('#search_type:checked').val() != 'on') {
            search_type = 'view_only';
        }
        else {
            search_type = 'edit';
        }

        console.log(ride_service.val(), date_begin.val(), date_end.val(), time_begin.val(), time_end.val(), location.val(), search_type);

        $.ajax({
            url: '/search_results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ rideService: ride_service.val(), dateBegin: date_begin.val(), dateEnd: date_end.val(), timeBegin: time_begin.val(), timeEnd: time_end.val(), address: location.val(), searchType: search_type }),
            success: function (response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');


                response.forEach(ride => {
                    if (ride.Type == 'view_only') {
                        tbodyEl.append('\
                            <tr>\
                                <td class="date">' + 'Date: ' + ride.Date + ' | ' + '</td>\
                                <td class="time">' + 'Time: ' + ride.Time + ' | ' + '</td>\
                                <td class="address">' + 'Address: ' + ride.Address + '</td>\
                            </tr>\
                        ');
                    }
                    else if (ride.Type == 'edit_uber') {
                        tbodyEl.append('\
                            <tr>\
                                <td>' + 'Identifier: ' + '</td>\
                                <td class="identifier">' + ride.Identifier + '</td>\
                                <td>' + ' | ' + '</td>\
                                <td>' + 'Date: ' + '<input type="date" class="date" value="' + ride.Date + '"></td>\
                                <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                <td>' + 'Longitude: ' + '<input type="text" class="longitude" value="' + ride.Longitude + '"></td>\
                                <td>' + 'Latitude: ' + '<input type="text" class="latitude" value="' + ride.Latitude + '"></td>\
                                <td>' + 'Base: ' + '<input type="text" class="base" value="' + ride.Base + '"></td>\
                                <td>\
                                    <button class="modify_uber_ride"> Update Ride </button>\
                                    <button class="delete_uber_ride"> Remove Ride </button>\
                                </td>\
                            </tr>\
                        ');
                    }
                    else if (ride.Type == 'edit_fhv') {
                        tbodyEl.append('\
                            <tr>\
                                <td>' + 'Identifier: ' + '</td>\
                                <td class="identifier">' + ride.Identifier + '</td>\
                                <td>' + ' | ' + '</td>\
                                <td>' + 'Date: ' + '<input type="date" class="date" value="' + ride.Date + '"></td>\
                                <td>' + 'Time: ' + '<input type="time" class="time" value="' + ride.Time + '"></td>\
                                <td>' + 'Address: ' + '<input type="text" class="address" value="' + ride.Address + '"></td>\
                                <td>\
                                    <button class="modify_fhv_ride"> Update Ride </button>\
                                    <button class="delete_fhv_ride"> Remove Ride </button>\
                                </td>\
                            </tr>\
                        ');
                    }

                });
            }
        });
    });




// CREATE/POST
$('#busiest-times').on('click', function (event) {
    event.preventDefault();

    $.ajax({
        url: '/busiest-times',
        method: 'POST',
        contentType: 'application/json',

        success: function (response) {
            var tbodyEl = $('tbody');

            tbodyEl.html('');


                tbodyEl.append('\
                    <tr>\
                        <td>' + '<b>Select a Riding Service to view Pick-ups per Hour</b> | ' + '</td>\
                        <td>\
                            Ride Service: <select class="service_selector_time" id="ride_service_time">\
                            <option value="Uber">Uber</option>\
                            <option value="American">American</option>\
                            <option value="Diplo">Diplo</option>\
                            <option value="Firstclass">Firstclass</option>\
                            <option value="Highclass">Highclass</option>\
                            <option value="Prestige">Prestige</option>\
                            </select>\
                            <button class="service4Time"> Add Ride </button>\
                        </td>\
                    </tr>\
                ');
        }
    });
});



    //Process busiest-time query and search
    $('table').on('click', '.service4Time', function () {
        console.log("Before...")
        var rowEl = $(this).closest('tr');
        var service = rowEl.find('.service_selector_time').val();
        console.log("After...")
        $.ajax({
            url: '/find_busiest_time',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Service: service }),
            success: function (response) {
                //console.log(response);
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                tbodyEl.append('\
                <tr>' + '<b>' + 'service' + ' Pick-ups per Hour</b> ' + '</tr>\
                <tr>\
                    <td class="hour">' + "Hour" + '</td>\
                    <td class="value">' + "Number of Rides" + '</td>\
                </tr>\
                ');

                response.Busiest_Time.forEach(function (time) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="hour">' + time.hour + '</td>\
                        <td class="value">' + time.value + '</td>\
                    </tr>\
                ');

                });
            }
        });
    });






    // CREATE/POST
    $('#add_fhv_ride').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/add_fhv_ride',
            method: 'POST',
            contentType: 'application/json',

            success: function (response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');


                    tbodyEl.append('\
                        <tr>\
                            <td>' + '<b>Add a For-Hire Service Trip</b> | ' + '</td>\
                            <td>\
                                Ride Service: <select class="service_selector" id="ride_service">\
                                <option value="American">American</option>\
                                <option value="Diplo">Diplo</option>\
                                <option value="Firstclass">Firstclass</option>\
                                <option value="Highclass">Highclass</option>\
                                <option value="Prestige">Prestige</option>\
                                </select>\
                            </td>\
                            <td>' + ' Date: ' + '<input type="date" class="date"></td>\
                            <td>' + ' Time: ' + '<input type="time" class="time"></td>\
                            <td>' + ' Address: ' + '<input type="text" class="address" placeholder="2557 Marion Ave Fordham"></td>\
                            <td>\
                                <button class="new_fhv_ride"> Add Ride </button>\
                            </td>\
                        </tr>\
                    ');
            }
        });
    });

    // CREATE/POST
    $('#add_uber_ride').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/add_uber_ride',
            method: 'POST',
            contentType: 'application/json',

            success: function (response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                    tbodyEl.append('\
                        <tr>\
                            <td>' + '<b>Add an Uber Trip</b> | ' + '</td>\
                            <td>' + ' Date: ' + '<input type="date" class="date"></td>\
                            <td>' + ' Time: ' + '<input type="time" class="time"></td>\
                            <td>' + ' Longitude: ' + '<input type="text" class="longitude" placeholder="-7X.XXXX"></td>\
                            <td>' + ' Latitude: ' + '<input type="text" class="latitude" placeholder="40.XXXX"></td>\
                            <td>' + ' Base: ' + '<input type="text" class="base" placeholder="B02XXX"></td>\
                            <td>\
                                <button class="new_uber_ride"> Add Ride </button>\
                            </td>\
                        </tr>\
                    ');
            }
        });
    });

    // Add New Ride
    $('table').on('click', '.new_fhv_ride', function () {
        var rowEl = $(this).closest('tr');
        var newService = rowEl.find('.service_selector').val();
        var newDate = rowEl.find('.date').val();
        var newTime = rowEl.find('.time').val();
        var newAddress = rowEl.find('.address').val();

        $.ajax({
            url: '/add_fhv',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Service: newService, Date: newDate, Time: newTime, Address: newAddress }),
            success: function (response) {
                console.log(response);
            }
        });
    });

    $('table').on('click', '.new_uber_ride', function () {
        var rowEl = $(this).closest('tr');
        var newDate = rowEl.find('.date').val();
        var newTime = rowEl.find('.time').val();
        var newLongitude = rowEl.find('.longitude').val();
        var newLatitude = rowEl.find('.latitude').val();
        var newBase = rowEl.find('.base').val();

        $.ajax({
            url: '/add_uber',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Date: newDate, Time: newTime, Longitude: newLongitude, Latitude: newLatitude, Base: newBase }),
            success: function (response) {
                console.log(response);
            }
        });
    });

    //Modify Rides
    $('table').on('click', '.modify_fhv_ride', function () {
        var rowEl = $(this).closest('tr');
        var Identifier = rowEl.find('.identifier').text();
        var newDate = rowEl.find('.date').val();
        var newTime = rowEl.find('.time').val();
        var newAddress = rowEl.find('.address').val();

        $.ajax({
            url: '/modify_fhv/' + Identifier,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Date: newDate, Time: newTime, Address: newAddress }),
            success: function (response) {
                console.log(response);
            }
        });
    });

    $('table').on('click', '.modify_uber_ride', function () {
        var rowEl = $(this).closest('tr');
        var Identifier = rowEl.find('.identifier').text();
        var newDate = rowEl.find('.date').val();
        var newTime = rowEl.find('.time').val();
        var newLongitude = rowEl.find('.longitude').val();
        var newLatitude = rowEl.find('.latitude').val();
        var newBase = rowEl.find('.base').val();

        $.ajax({
            url: '/modify_uber/' + Identifier,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ Date: newDate, Time: newTime, Longitude: newLongitude, Latitude: newLatitude, Base: newBase }),
            success: function (response) {
                console.log(response);
            }
        });
    });

    //Delete Rides
    $('table').on('click', '.delete_fhv_ride', function () {
        var rowEl = $(this).closest('tr');
        var Identifier = rowEl.find('.identifier').text();
        
        $.ajax({
            url: '/delete_fhv/' + Identifier,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                $('#initiate_search').click();
            }
        });
    });

    $('table').on('click', '.delete_uber_ride', function () {
        var rowEl = $(this).closest('tr');
        var Identifier = rowEl.find('.identifier').text();
        
        $.ajax({
            url: '/delete_uber/' + Identifier,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                $('#initiate_search').click();
            }
        });
    });


    // CREATE/POST
    $('#compare_parameters').on('submit', function(event) {
        event.preventDefault();

        var ride_service_compare = $('#ride_service_compare');


        $.ajax({
            url: '/compare_results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ rideService: ride_service_compare.val() }),
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');
                tbodyEl.append('\
                <tr>\
                    <td class="month">' + "month" + '</td>\
                    <td class="u_rides">' + "Uber Rides" + '</td>\
                    <td class="f_rides">' + response.comparing[0].f_name + " Rides" + '</td>\
                </tr>\
                ');

                response.comparing.forEach(function(compare) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="month">' + compare.month + '</td>\
                        <td class="u_rides">' + compare.u_rides + '</td>\
                        <td class="f_rides">' + compare.f_rides + '</td>\
                    </tr>\
                    ');
            
            });
            }
        });
    });


});

//--------------------------------------
// Functions below assure that the date
// and time are input properly on the
// website.
//--------------------------------------

function DateChange(ride_service) {
    if (ride_service.value != 'Uber') {
        var date_range = document.getElementById('date_begin');
        date_range.min = "2014-07-01";
        date_range.max = "2014-09-30";

        if (date_range.value < date_range.min && date_range.value != 0) {
            date_range.value = date_range.min;
        }
        if (date_range.value > date_range.max && date_range.value != 0) {
            date_range.value = date_range.max;
        }

        var date_range = document.getElementById('date_end');
        date_range.min = "2014-07-01";
        date_range.max = "2014-09-30";
        
        if (date_range.value < date_range.min && date_range.value != 0) {
            date_range.value = date_range.min;
        }
        if (date_range.value > date_range.max && date_range.value != 0) {
            date_range.value = date_range.max;
        }
    }
    else {
        var date_range = document.getElementById('date_begin');
        date_range.min = "2014-04-01";
        date_range.max = "2014-09-30";

        var date_range = document.getElementById('date_end');
        date_range.min = "2014-04-01";
        date_range.max = "2014-09-30";
    }
}

function BeginDateCheck(date_to_check) {
    var date_end = document.getElementById('date_end').value;
    if (date_to_check.value > date_end && date_end.length != 0) {
        date_to_check.value = date_end;
    }
}

function EndDateCheck(date_to_check) {
    var date_begin = document.getElementById('date_begin').value;
    if (date_to_check.value < date_begin && date_end.length != 0) {
        date_to_check.value = date_begin;
    }
}

function BeginTimeCheck(time_to_check) {
    var time_end = document.getElementById('time_end').value;
    if (time_to_check.value > time_end && time_end.length != 0) {
        time_to_check.value = time_end;
    }
}

function EndTimeCheck(time_to_check) {
    var time_begin = document.getElementById('time_begin').value;
    if (time_to_check.value < time_begin && time_end.length != 0) {
        time_to_check.value = time_begin;
    }
}