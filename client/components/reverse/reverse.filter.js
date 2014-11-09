'use strict';

angular.module('lineupApp')
  .filter('reverse', function () {
    return function (items) {
      return (items ? items.slice().reverse() : []);
    };
  });
