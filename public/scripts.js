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
                        <td class="date">' + uber.date_time + '</td>\
                        <td class="long">' + uber.lon + '</td>\
                        <td class="lat">' + uber.lat + '</td>\
                    </tr>\
                ');
                
                });
            }
        }); 
    });

// GET/compare
$('#compare').on('click', function() {
    $.ajax({
        url: '/compare',
        contentType: 'application/json',
        success: function(response) {
        
            var tbodyEl = $('tbody');

            tbodyEl.html('');
console.log(response.comparing.uber)
                tbodyEl.append('\
                <tr>\
                    <td class="compare">' + 'Uber Rides: ' + response.comparing.uber + ' | ' + response.comparing.f_name + ' Rides: ' + response.comparing.f_rides + '</td>\
                </tr>\
            ');
            
        }
    }); 
});



});