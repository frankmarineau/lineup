'use strict';

angular.module('lineupApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.isUser = function() {
      return Auth.getCurrentUser().role === 'user';
    };
  });