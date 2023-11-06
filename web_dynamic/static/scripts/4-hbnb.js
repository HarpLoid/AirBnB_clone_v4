/**
 * Listens for changes on input
 */
$(document).ready(function () {
  const ls_amenity = {};
  $('input[type=checkbox]').on('change', function () {
    data_id = $(this).attr('data-id');
    data_name = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      ls_amenity[data_id] = data_name;
    } else {
      delete ls_amenity[data_id];
    }
    $('.amenities h4').text(Object.values(ls_amenity).join(', '));
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
   * Post Place Search
   */

  // $.ajax({
  //   type: 'POST',
  //   url: 'http://0.0.0.0:5001/api/v1/places_search/',
  //   data: '{}',
  //   contentType: 'application/json',
  //   success: places_search_append,
  // });

  /**
   * Filter Places By Amenities
   */
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(ls_amenity) }),
      contentType: 'application/json',
      dataType: 'json',
      success: places_search_append,
    });
  });
});

function places_search_append(data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    $('section.places').append(
      '<article><div class="title_box"><h2>' +
        data[i].name +
        '</h2><div class="price_by_night">$' +
        data[i].price_by_night +
        '</div></div><div class="information"><div class="max_guest">' +
        data[i].max_guest +
        ' Guest</div><div class="number_rooms">' +
        data[i].number_rooms +
        ' Bedroom</div><div class="number_bathrooms">' +
        data[i].number_bathrooms +
        ' Bathroom</div></div><div class="description">' +
        data[i].description +
        '</div></article>'
    );
  }
}
