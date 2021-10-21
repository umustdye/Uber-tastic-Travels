$(function() {
    // GET/pickup
    $('#get-pickup').on('click', function() {
        $.ajax({
            url: '/pickup_date',
            contentType: 'application/json',
            success: function(response) {
            
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.uber_date.forEach(function(uber) {
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

    // GET/compare
    $('#compareDiplo').on('click', function() {
        $.ajax({
            url: '/compareDiplo',
            contentType: 'application/json',
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



    // CREATE/POST
    $('#search_parameters').on('submit', function(event) {
        event.preventDefault();

        var ride_service = $('#ride_service');
        var date_begin = $('#date_begin');
        var date_end = $('#date_end');
        var time_begin = $('#time_begin');
        var time_end = $('#time_end');
        var location = $('#location');

        //console.log(ride_service.val(), date_begin.val(), date_end.val(), time_begin.val(), time_end.val(), location.val());

        $.ajax({
            url: '/search_results',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ rideService: ride_service.val(), dateBegin: date_begin.val(), dateEnd: date_end.val(), timeBegin: time_begin.val(), timeEnd: time_end.val(), address: location.val() }),
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(ride => {
                    tbodyEl.append('\
                    <tr>\
                        <td class="date">' + 'Date: ' + ride.Date + ' | ' + '</td>\
                        <td class="time">' + 'Time: ' +  ride.Time + ' | ' + '</td>\
                        <td class="address">' + 'Address: ' + ride.Address + '</td>\
                    </tr>\
                ');
                
                });
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