'use strict';

angular.module('lineupApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, User) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          Auth.getCurrentUser().$promise.then(function(user) {
            if (user.role === "admin" || user.role === "clerk") {
              $location.path('/lineups');
            }
            else if (user.role === "user") {
              $location.path('/guests');
            }
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
