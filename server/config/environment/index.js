'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: '-o)VkeaEk*]mQCJ^5Jtq-4L<ZbMu/I[|JmMW/5|%~EX7VU2uA=w*vHX:]@A{n:>'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'clerk', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'Si0YGJTqwWlweira3LOq37jGr',
    clientSecret: process.env.TWITTER_SECRET || '7pAgHwbrkrlxCws6ACu0KT8oN9q3XITMOGLLIz3PTRAWBHbaMn',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || '1089881844763-o6vee3o077p9cgbkpjf3i767gkv039je.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'xQvMbA8lE4imTzNs6qmKFkM7',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
