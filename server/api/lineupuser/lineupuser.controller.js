'use strict';

var _ = require('lodash');
var Lineupuser = require('./lineupuser.model');



function handleError(res, err) {
  return res.send(500, err);
}
