'use strict';

describe('Service: Lineup', function () {

  // load the service's module
  beforeEach(module('lineupApp'));

  // instantiate service
  var lineup;
  beforeEach(inject(function (_lineup_) {
    lineup = _lineup_;
  }));

  it('should do something', function () {
    expect(!!lineup).toBe(true);
  });

});
