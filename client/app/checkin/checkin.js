'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkin/:id', {
        templateUrl: 'app/checkin/checkin.html',
        controller: 'CheckinCtrl',
        authenticate: true
      });
  });
