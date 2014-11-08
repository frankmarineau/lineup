'use strict';

describe('Service: ClientLineup', function () {

  // load the service's module
  beforeEach(module('lineupApp'));

  // instantiate service
  var ClientLineup;
  beforeEach(inject(function (_ClientLineup_) {
    ClientLineup = _ClientLineup_;
  }));

  it('should do something', function () {
    expect(!!ClientLineup).toBe(true);
  });

});
