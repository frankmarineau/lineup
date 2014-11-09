'use strict';

angular.module('lineupApp')
  .controller('HomeCtrl', function ($scope, Auth, $location, User) {
    if (Auth.isLoggedIn()) {
      Auth.getCurrentUser().$promise.then(function(user) {
        if (user.role === "admin" || user.role === "clerk") {
          $location.path('/lineups');
        }
        else if (user.role === "user") {
          $location.path('/guests');
        }
      });
    }

    $('#next').on('click', function() {
        $('html, body').animate({
          scrollTop: $('#what').offset().top
        }, 1000);
    });
  });
