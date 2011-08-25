var util = require('util');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var clouddns = require('../lib/clouddns');

var helpers = exports;
var testConfig;
var client;

helpers.loadConfig = function () {

  try {

    var configFile = path.join(__dirname, 'fixtures', 'test-config.json');
    var config = JSON.parse(fs.readFileSync(configFile).toString());

    if (config.auth.username === 'test-username' || config.auth.apiKey === 'test-apiKey') {
      util.puts('Config file test-config.json must be updated with valid data before running tests.');
      process.exit(0);
    }

    testConfig = config;

    return config;

  } catch (ex) {
    util.puts('Config file test/fixtures/test-config.json must be created with valid data before running tests.');
    process.exit(0);
  }

};

helpers.createClient = function () {

  if (!testConfig) {
    helpers.loadConfig();
  }

  if (!client) {
    client = clouddns.createClient(testConfig);
  }

  return client;

};

helpers.requireAuth = function () {
  return {
    "This test required Rackspace authorization": {
      topic: function () {
        if (client.authorized) {
          return this.callback();
        }
        client.setAuth(this.callback);
      },
      "the client is now authorized": function () {
        assert.isTrue(client.authorized);
      }
    }
  }
};
