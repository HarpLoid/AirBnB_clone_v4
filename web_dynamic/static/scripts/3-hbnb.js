/**
 * Listens for changes on input
 */

$(document).ready(function () {
  const ls_amenity = [];
  $('input[type=checkbox]').on('change', function () {
    const name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      ls_amenity.push(name);
    } else {
      ls_amenity = ls_amenity.filter((amenity) => amenity !== name);
    }
    $('.amenities h4').text(ls_amenity.join(', '));
  });

  /**
   * Check API status
   */

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
  });

  /**
   * Get Place Search
   */

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    success: function (data) {
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(
          '<article><div class="title_box"><h2>' +
            data[i].name +
            '</h2><div class="price_by_night">$' +
            data[i].price_by_night +
            '</div></div><div class="information"><div class="max_guest">' +
            data[i].max_guest +
            'Guest</div><div class="number_rooms">' +
            data[i].number_rooms +
            'Bedroom</div><div class="number_bathrooms">' +
            data[i].number_bathrooms +
            'Bathroom</div></div><div class="description">' +
            data[i].description +
            '</div></article>'
        );
      }
    },
  });
});
