$(document).ready(function() {

    const $valueSpan = $('.inActivityIntervalSpan');
    const $value = $('#inActivityIntervalSlider');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
  
      $valueSpan.html($value.val());
    });
  });