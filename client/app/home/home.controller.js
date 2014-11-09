'use strict';

angular.module('lineupApp')
  .controller('HomeCtrl', function ($scope) {
    $('#next').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#what').offset().top -60
        }, 1000);
    });
  });
