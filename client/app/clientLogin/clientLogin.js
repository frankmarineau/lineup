'use strict';

angular.module('lineupApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/clientLogin', {
        templateUrl: 'app/clientLogin/clientLogin.html',
        controller: 'ClientloginCtrl'
      });
  });
