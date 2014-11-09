'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/guests/:lineupUserId', {
        templateUrl: 'app/clientLogin/clientLogin.html',
        controller: 'ClientloginCtrl'
      });
  });
