'use strict';

describe('Controller: ClientlineupCtrl', function () {

  // load the controller's module
  beforeEach(module('lineupApp'));

  var ClientlineupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientlineupCtrl = $controller('ClientlineupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
