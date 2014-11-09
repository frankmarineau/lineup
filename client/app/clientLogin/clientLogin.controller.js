'use strict';

angular.module('lineupApp')
  .controller('ClientloginCtrl', function ($scope, $routeParams, $window) {
    $scope.loginOauth = function(provider) {
      console.log('/auth/' + provider + '?state=' + $routeParams.lineupUserId);
      $window.location.href = '/auth/' + provider + '?state=' + $routeParams.lineupUserId;
    };
  });
