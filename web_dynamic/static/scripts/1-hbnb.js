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
});
