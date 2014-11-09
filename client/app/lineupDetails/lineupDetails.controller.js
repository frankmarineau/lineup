'use strict';

angular.module('lineupApp')
  .controller('LineupdetailsCtrl', function ($scope, Lineup, $routeParams, $http) {
    $scope.lineup = Lineup.query($routeParams.id);

    $scope.achalandageChart = {
      labels : [],
      datasets : [
        {
          fillColor : "rgba(0,0,0,0)",
          strokeColor : "#85D600",
          pointColor : "#85D600",
          pointStrokeColor : "#85D600",
          data : []
        },
        {
          fillColor : "rgba(0,0,0,0)",
          strokeColor : "#EE4C41;",
          pointColor : "#EE4C41",
          pointStrokeColor : "#EE4C41",
          data : []
        }
      ]
    };

    $scope.chartOptions = {
      scaleStartValue: 0
    };

    $scope.dateRange = 'week';

    var dataShowUps = { day: [], week: [], month: [] };
    var dataNoShows = { day: [], week: [], month: [] };
    var labels = { day: [], week: [], month: [] };

    var max = 5;
    var min = 2;
    var noShowsMax = 1;
    for (var i = 0; i < 24; ++i) {
      dataShowUps.day.push(Math.round(Math.random() * (max - min)) + min);
      dataNoShows.day.push(Math.round(Math.random() * noShowsMax));
      labels.day.push(i);
    }

    max = 23;
    min = 14;
    noShowsMax = 7;
    for (var i = 0; i < 7; ++i) {
      dataShowUps.week.push(Math.round(Math.random() * (max - min)) + min);
      dataNoShows.week.push(Math.round(Math.random() * noShowsMax));
    }
    labels.week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    max = 23;
    min = 14;
    noShowsMax = 7;
    for (var i = 0; i < 30; ++i) {
      dataShowUps.month.push(Math.round(Math.random() * (max - min)) + min);
      dataNoShows.month.push(Math.round(Math.random() * noShowsMax));
      labels.month.push(i + 1);
    }

    var pickDateRange = function() {
      var curDataShowUps;
      var curDataNoShows;
      var curLabels;
      if ($scope.dateRange == 'day') {
        curDataShowUps = dataShowUps.day;
        curDataNoShows = dataNoShows.day;
        curLabels = labels.day;
      } else if ($scope.dateRange == 'week') {
        curDataShowUps = dataShowUps.week;
        curDataNoShows = dataNoShows.week;
        curLabels = labels.week;
      } else if ($scope.dateRange == 'month') {
        curDataShowUps = dataShowUps.month;
        curDataNoShows = dataNoShows.month;
        curLabels = labels.month;
      }
      $scope.achalandageChart.labels = curLabels;
      $scope.achalandageChart.datasets[0].data = curDataShowUps;
      $scope.achalandageChart.datasets[1].data = curDataNoShows;
    };

    pickDateRange();
    $scope.$watch('dateRange', pickDateRange);

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
