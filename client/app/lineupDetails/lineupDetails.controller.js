'use strict';

angular.module('lineupApp')
  .controller('LineupdetailsCtrl', function ($scope, Lineup, $routeParams, $http, Auth, $location) {
    if (Auth.getCurrentUser().role === "clerk") {
      $location.path('/checkin/' + $routeParams.id);
    }

    Lineup.get({id: $routeParams.id}).$promise.then(function(lineup) {
      $scope.lineup = lineup;
      $scope.openingHour = new Date();
      $scope.openingHour.setHours(lineup.opening.hour);
      $scope.openingHour.setMinutes(lineup.opening.minute);
      $scope.closingHour = new Date();
      $scope.closingHour.setHours(lineup.closing.hour);
      $scope.closingHour.setMinutes(lineup.closing.minute);
    });

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

    $scope.getRandomAge = function() {
      return [19,21,'-',23,19,23,'-',29,22,'-',26,19,'-'][Math.floor(Math.random()*12)];
    };

    $scope.getTimeInterval = function(timeJoined, timeLeft) {
      if (!timeLeft || !timeJoined) return "-";
      return Math.floor((new Date(timeLeft).getTime() - new Date(timeJoined).getTime()) / 60 / 1000) + " min";
    };

    $scope.chartOptions = {
      scaleStartValue: 0,
      animationSteps : 30
    };

    $scope.dateRange = 'week';

    var dataShowUps = { day: [], week: [], month: [] };
    var dataNoShows = { day: [], week: [], month: [] };
    var labels = { day: [], week: [], month: [] };

    var max = 5;
    var min = 2;
    var noShowsMax = 1;
    var strt = 0;
    var end = 15;
    for (var i = 0; i < strt; ++i) {
      dataShowUps.day.push(0);
      dataNoShows.day.push(0);
      labels.day.push(i);
    }
    for (var i = strt; i < end; ++i) {
      dataShowUps.day.push(Math.round(Math.random() * (max - min)) + min);
      dataNoShows.day.push(Math.round(Math.random() * noShowsMax));
      labels.day.push(i);
    }
    for (var i = end; i < 24; ++i) {
      dataShowUps.day.push(0);
      dataNoShows.day.push(0);
      labels.day.push(i);
    }

    max = 23;
    min = 14;
    noShowsMax = 7;
    for (var i = 0; i < 7; ++i) {
      if (i == 5) {
        dataShowUps.week.push(Math.round(Math.random() * (max - min)) + min);
        dataNoShows.week.push(Math.round(Math.random() * noShowsMax));
      } else {
        dataShowUps.week.push(0);
        dataNoShows.week.push(0);
      }
    }
    labels.week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    max = 23;
    min = 14;
    noShowsMax = 7;
    for (var i = 0; i < 30; ++i) {
      if (i == 7) {
        dataShowUps.month.push(Math.round(Math.random() * (max - min)) + min);
        dataNoShows.month.push(Math.round(Math.random() * noShowsMax));
      } else {
        dataShowUps.month.push(0);
        dataNoShows.month.push(0);
      }

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
      Lineup.update({id: $scope.lineup._id}, {
        title: $scope.lineup.title,
        maxInQueue: $scope.lineup.maxInQueue,
        opening: {
          hour: $scope.openingHour.getHours(),
          minute: $scope.openingHour.getMinutes()
        },
        closing: {
          hour: $scope.closingHour.getHours(),
          minute: $scope.closingHour.getMinutes()
        },
        welcomeMessage: $scope.lineup.welcomeMessage
      });
    };

    $scope.deleteLineup = function() {
      Lineup.remove({ id: $scope.lineup._id });
      $location.path('/lineups');
    };
  });
