/*
 * container-test.js: Tests for Rackspace Cloudfiles containers
 *
 * (C) 2010 Nodejitsu Inc.
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


vows.describe('node-clouddns/domain').addBatch({
  "The node-clouddns client": {
    "when listing domains": {
      topic: function () {
      	client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
    	client.getDomains(this.callback);
      },
      "should not report an error": function (err, domains) {
        assert.isNull(err);
      },
      "should return a list of domains": function (err, domains) {
        assert.isArray(domains);
      }
    }, "when creating domains": {
      topic: function () {
        var self = this;
      	client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
      	client.getDomains(function (err, oldDomains) {
        	var count = oldDomains.length;
        	
        	client.rackspace = function(reqOpt, callback, success){
	      		return success(responses.createDomain());
	      	}
	      	
        	client.createDomain(requests.createDomain, function(err, newDomains){
        		self.callback(err, newDomains, count)
        	});
        });
      },
      "should not report an error": function (err, domains) {
        assert.isNull(err);
      },
      "should return a list of domains": function (err, domains) {
        assert.isArray(domains);
      }
    }
  }
}).addBatch({
  "The Domain Object": {
    "when getting domain details": {
      topic: function () {
        var self = this;
      	client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.getDetails());
			}

           	domains[0].getDetails(self.callback)
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      },
      "should populate the nameservers property": function (err, domain) {
        assert.isArray(domain.nameservers);
      },
      "should populate the recordsList property": function (err, domain) {
        assert.isArray(domain.recordsList.records);
      }
    }
    , "when getting domain changes": {
      topic: function () {
        var self = this;
      	client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
			client.rackspace = function(reqOpt, callback, success){
				return success(responses.getChanges());
			}
        	domains[0].getChanges(self.callback);
        });
      },
      "should not report an error": function (err, changes) {
        assert.isNull(err);
      },
      "should return a list of changes": function (err, changes) {
        assert.isArray(changes.changes);
      }
    }
    , "when exporting a domain": {
      topic: function () {
        var self = this;
      	client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.getExport());
			}
        	domains[0].getExport(self.callback);
        });
      },
      "should not report an error": function (err, bind9data) {
        assert.isNull(err);
      },
      "should return a string with the BIND9 db file contents": function (err, bind9data) {
      	assert.isString(bind9data);
		//TODO: Assert something here
      }
    }
    , "when creating a sub domain": {
      topic: function () {
        var self = this;
      	client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
            client.rackspace = function(reqOpt, callback, success){
				return success(responses.createDomain());
			}
        	domains[0].createSubDomain(self.callback);
        });
      },
      "should not report an error": function (err, domains) {
        assert.isNull(err);
      },
      "should return a list of domains": function (err, domains) {
        assert.isArray(domains);
      }
    }
    /*, "when importing a domain": {
      topic: function () {
        var self = this;
        client.getDomains(function (err, domains) {
        	//TODO: add bind9 data
        	var bind9data = "";
        	
        	domains[0].importDomain(bind9data, self.callback);
        });
      },
      "should actually create the domain": function (err, changes) {
      	assert.ok(err);
		//TODO: Assert something here, like the total entries
      }
    }, "when updating a domain": {
      topic: function () {
        var self = this;
        client.getDomains(function (err, domains) {
        	domains[0].comment = domains[0].comment + " updated";
        	domains[0].getDetails(self.callback)
        });
      },
      "should actually update the domain": function (err, domain) {
      	assert.ok(err);
		assert.equals("updated", domain.comment.indexOf(-7));
      }
    }, "when removing a domain": {
      topic: function () {
        var self = this;
        client.getDomains(function (err, domains) {
        	var count = domains.length;
        	domains[0].removeDomain(function(err){
        		this.callback(err, count);
        	});
        });
      },
      "should actually remove the domain": function (err, count) {
      	assert.ok(err);
		client.getDomains(function (err, domains) {
			assert.ok(err);
        	assert.equals(count - 1, domains.length)
        });
      }
    }, "when adding records": {
      topic: function () {
        var self = this;
        client.getDomains(function (err, domains) {
        	domains[0].getDetails(self.callback)
        });
      },
      "should actually create the records": function (err, changes) {
      	assert.ok(err);
		//TODO: Assert something here, like the total entries
      }
    }*/
  }
}).export(module);
