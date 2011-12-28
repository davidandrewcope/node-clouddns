/*
 * domain-test.js: Tests for Rackspace Clouddns domains
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
      "should return the updated parent domain object": function (err, domain) {
        assert.isObject(domain);
      }
    }
    , "when importing a domain": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	var bind9data = "\n    \t\texample.net. 3600 IN SOA ns.rackspace.com.\n\t\t\tsample@rackspace.com. 1308874739 3600 3600 3600 3600\n\t\t\texample.net. 86400 IN A 110.11.12.16\n\t\t\texample.net. 3600 IN MX 5 mail2.example.net.\n\t\t\twww.example.net. 5400 IN CNAME example.net.\t\t\n\t\t";
        	
        	domains[0].importDomain(bind9data, self.callback);
        });
      },
      "should not report an error": function (err, domains) {
        assert.isNull(err);
      },
      "should return the created domain": function (err, domain) {
        assert.isObject(domain);
      }
    }
    , "when updating a domain": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	domains[0].comment = domains[0].comment + " updated";
        	domains[0].getDetails(self.callback)
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      },
      "should return the updated domain": function (err, domain) {
        assert.isObject(domain);
      }
    }
    , "when removing a domain": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	domains[0].removeDomain(self.callback);
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      }
    }
    , "when listing subdomains": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.getDetails());
			}

           	domains[0].getSubDomains(self.callback)
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      },
      "should return an array of subdomains": function (err, subdomains) {
        assert.isArray(subdomains);
      }
    }, "when listing records": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.getDetails());
			}

           	domains[0].getRecords(self.callback)
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      },
      "should return an array of records": function (err, records) {
        assert.isArray(records);
      }
    }
    , "when adding records": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.addRecords());
			}
        	domains[0].addRecords(requests.addRecords(), self.callback);
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      }
      , "should return domain object": function (err, domain) {
      	assert.isObject(domain);
      }
    } 
    , "when updating records": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.addRecords());
			}
        	domains[0].updateRecords(requests.addRecords(), self.callback);
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      }
      , "should return domain object": function (err, domain) {
      	assert.isObject(domain);
      }
    } 
    , "when deleting records": {
      topic: function () {
        var self = this;
        client.rackspace = function(reqOpt, callback, success){
      		return success(responses.getDomains());
      	}
        client.getDomains(function (err, domains) {
        	client.rackspace = function(reqOpt, callback, success){
				return success(responses.addRecords());
			}
        	domains[0].deleteRecords(requests.addRecords(), self.callback);
        });
      },
      "should not report an error": function (err, domain) {
        assert.isNull(err);
      }
      , "should return domain object": function (err, domain) {
      	assert.isObject(domain);
      }
    } 
  }
}).export(module);
