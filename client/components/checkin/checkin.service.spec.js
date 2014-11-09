'use strict';

describe('Service: checkin', function () {

  // load the service's module
  beforeEach(module('lineupApp'));

  // instantiate service
  var checkin;
  beforeEach(inject(function (_checkin_) {
    checkin = _checkin_;
  }));

  it('should do something', function () {
    expect(!!checkin).toBe(true);
  });

});
