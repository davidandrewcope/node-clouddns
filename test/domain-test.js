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
	, responses = require("./fixtures/responses");


vows.describe('node-clouddns/domain').addBatch({
  "The node-clouddns client": {
    "when listing domains": {
      topic: function () {
      	client.rackspace = function(reqOpt, callback, success){
      		console.log("rackspace called");
      		console.dir(responses.getDomains());
      		return success(responses.getDomains());
      	}
        client.getDomains(this.callback);
      },
      "should return a list of domains": function (err, domains) {
        assert.isArray(domains);
      }
    }/*, "when creating domains": {
      topic: function () {
      	client.rackspace = function(reqOpt, callback, success){
      		return success(null, responses.getDomains);
      	}
      	client.getDomains(function (err, oldDomains) {
        	var count = oldDomains.length;
        	client.createDomain(domainObj, function(err, newDomains){
        		this.callback(err, newDomains, count)
        	});
        });
      },
      "should actually create the domain": function (err, newDomains, count) {
      	assert.ok(err);
        assert.equals(count + 1, newDomains.length);
      }
    }*/
  }
})/*.addBatch({
  "The Domain Object": {
    "when getting domain details": {
      topic: function () {
        client.getDomains(function (err, domains) {
        	domains[0].getDetails(this.callback)
        });
      },
      "should populate the nameservers, and recordsList properties": function (err, domain) {
      	assert.ok(err);
        assert.isArray(domain.nameservers);
        assert.isArray(domain.recordsList);
      }
    }
    , "when getting domain changes": {
      topic: function () {
        client.getDomains(function (err, domains) {
        	domains[0].getChanges(this.callback);
        });
      },
      "should return a list of changes": function (err, changes) {
      	assert.ok(err);
        assert.isArray(changes.changes);
      }
    }
    , "when exporting a domain": {
      topic: function () {
        client.getDomains(function (err, domains) {
        	domains[0].getExport(this.callback);
        });
      },
      "should return a string with the BIND9 db file contents": function (err, bind9data) {
      	assert.ok(err);
		//TODO: Assert something here
      }
    }
    , "when creating a sub domain": {
      topic: function () {
        client.getDomains(function (err, domains) {
        	domains[0].createSubDomain(this.callback);
        });
      },
      "should actually create the sub domain": function (err, changes) {
		//TODO: Assert something here, like the total entries
      }
    }, "when importing a domain": {
      topic: function () {
        client.getDomains(function (err, domains) {
        	//TODO: add bind9 data
        	var bind9data = "";
        	
        	domains[0].importDomain(bind9data, this.callback);
        });
      },
      "should actually create the domain": function (err, changes) {
      	assert.ok(err);
		//TODO: Assert something here, like the total entries
      }
    }, "when updating a domain": {
      topic: function () {
        client.getDomains(function (err, domains) {
        	domains[0].comment = domains[0].comment + " updated";
        	domains[0].getDetails(this.callback)
        });
      },
      "should actually update the domain": function (err, domain) {
      	assert.ok(err);
		assert.equals("updated", domain.comment.indexOf(-7));
      }
    }, "when removing a domain": {
      topic: function () {
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
        client.getDomains(function (err, domains) {
        	domains[0].getDetails(this.callback)
        });
      },
      "should actually create the records": function (err, changes) {
      	assert.ok(err);
		//TODO: Assert something here, like the total entries
      }
    }
  }
})*/.export(module);
