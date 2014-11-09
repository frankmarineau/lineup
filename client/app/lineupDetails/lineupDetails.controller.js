'use strict';

angular.module('lineupApp')
  .controller('LineupdetailsCtrl', function ($scope, Lineup, $routeParams, $http) {
    $scope.lineup = Lineup.query($routeParams.id);

    $scope.achalandageChart = {
      labels : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets : [
        {
          fillColor : "#B7E2FB",
          strokeColor : "#0f9ff1",
          pointColor : "#0f9ff1",
          pointStrokeColor : "#0f9ff1",
          data : [9, 8, 10, 11, 14, 13, 15]
        },
        {
          fillColor : "#F8D9BD",
          strokeColor : "#e67e22",
          pointColor : "#e67e22",
          pointStrokeColor : "#e67e22",
          data : [4, 3, 2, 4, 4, 3, 2]
        }
      ]
    };

    $scope.chartOptions = {
      scaleStartValue: 0
    };

    $scope.updateSettings = function() {
      $http.post('/users/settings', {
        title: $scope.title,
        maxInQueue: $scope.maxInQueue,
        openingHour: $scope.openingHour,
        closingHour: $scope.closingHour,
        welcomeMessage: $scope.welcomeMessage
      }).success(function(data) {

      }).error(function(data, status, headers, config) {
        console.log("error POSTing settings")
      });
    };
  });
