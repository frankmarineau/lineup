'use strict';

angular.module('lineupApp')
  .controller('LineupdetailsCtrl', function ($scope, Lineup, $routeParams) {
    Lineup.query($routeParams.id);
  });
