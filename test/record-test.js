/*
 * record-test.js: Tests for Rackspace Clouddns records
 *
 * (C) 2010 Nodejitsu Inc.
 * (C) 2011 Andrew Cope
 * MIT LICENSE
 *
 */

var path = require('path')
	, vows = require('vows')
	, assert = require('assert')
	, helpers = require('./helpers')
	, clouddns = require('../lib/clouddns')
	, client = helpers.createClient()
	, responses = require("./fixtures/responses")
	, requests = require("./fixtures/requests");

//TODO: These tests rely on a correctly stubbed out rackspace function
// 	This needs updated to a big switch statement, that will return the expected response based on the request

vows.describe('node-clouddns/record').addBatch({
  "The Record Object": {
     "when updating": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.getDetails());
			}

           	domains[0].getRecords(function(err, records){
           		records[0].updateRecord(self.callback);
           	});
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      },
      "should return the updated record": function (err, record) {
        assert.isObject(record);
      }
    }
    , "when deleting": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.getDetails());
			}

           	domains[0].getRecords(function(err, records){
           		records[0].deleteRecord(self.callback);
           	});
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      }
    }
  }
}).export(module);
