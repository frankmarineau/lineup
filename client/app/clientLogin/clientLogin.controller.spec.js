'use strict';

describe('Controller: ClientloginCtrl', function () {

  // load the controller's module
  beforeEach(module('lineupApp'));

  var ClientloginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientloginCtrl = $controller('ClientloginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
