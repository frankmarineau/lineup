'use strict';

describe('Controller: ClientlineupdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('lineupApp'));

  var ClientlineupdetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientlineupdetailsCtrl = $controller('ClientlineupdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
