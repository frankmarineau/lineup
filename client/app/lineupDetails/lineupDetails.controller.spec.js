'use strict';

describe('Controller: LineupdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('lineupApp'));

  var LineupdetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LineupdetailsCtrl = $controller('LineupdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
