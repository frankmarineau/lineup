'use strict';

describe('Controller: LineuplistCtrl', function () {

  // load the controller's module
  beforeEach(module('lineupApp'));

  var LineuplistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LineuplistCtrl = $controller('LineuplistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
