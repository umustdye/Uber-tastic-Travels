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
                    </tr>\
                ');
                
                });
            }
        }); 
    });
});