require.paths.unshift(require('path').join(__dirname, '..', 'lib'));

var path = require('path');
var vows = require('vows');
var assert = require('assert');
var helpers = require('./helpers');
var clouddns = require('clouddns');

var client = helpers.createClient();

vows.describe('node-clouddns/authentication').addBatch({
  "The node-clouddns client": {
    "with a valid username and api key": {
      topic: function () {
        client.setAuth(this.callback);
      },
      "should respond with 204 and appropriate headers": function (err, res) {
        assert.equal(res.statusCode, 204);
        assert.isObject(res.headers);
        assert.include(res.headers, 'x-server-management-url');
        assert.include(res.headers, 'x-storage-url');
        assert.include(res.headers, 'x-cdn-management-url');
        assert.include(res.headers, 'x-auth-token');
        assert.include(res.headers, 'x-storage-token');
      },
      "should update the config with appropriate urls": function (err, res) {
        assert.equal(res.headers['x-server-management-url'], client.config.serverUrl);
        assert.equal(res.headers['x-storage-url'], client.config.storageUrl);
        assert.equal(res.headers['x-cdn-management-url'], client.config.cdnUrl);
        assert.equal(res.headers['x-auth-token'], client.config.authToken);
        assert.equal(res.headers['x-storage-token'], client.config.storageToken);
        assert.isDefined(client.config.accountId);
        assert.isDefined(client.config.dnsUrl);
      }
    },
    "with an invalid username and api key": {
      topic: function () {
        var invalidClient = clouddns.createClient({
          auth: {
            username: 'invalid-username',
            apiKey: 'invalid-apikey'
          }
        });
        invalidClient.setAuth(this.callback);
      },
      "should respond with 401": function (err, res) {
        assert.equal(res.statusCode, 401);
      }
    }
  }
}).export(module);
