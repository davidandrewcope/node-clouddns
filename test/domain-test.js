/*
 * container-test.js: Tests for Rackspace Cloudfiles containers
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */

require.paths.unshift(require('path').join(__dirname, '..', 'lib'));

var path = require('path');
var vows = require('vows');
var assert = require('assert');
var helpers = require('./helpers');
var clouddns = require('clouddns');

var client = helpers.createClient();

vows.describe('node-clouddns/containers').addBatch({
  "The node-clouddns client": {
    "when listing domains": {
      topic: function () {
        client.getDomains(this.callback);
      },
      "should return a list of domains": function (err, domains) {
        assert.isArray(domains);
      }
    }
  }
}).export(module);
