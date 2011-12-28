/*
 * core.js: Core functions for accessing Rackspace CloudFiles
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var request = require('request')
	, clouddns = require('../clouddns')
	, config = require('./config')
	, common = require('./common');


//
// ### function createClient (options)
// #### @options {Object} Options for this instance.
// Creates a new instance of a Loggly client.
//
exports.createClient = function (options) {
  return new CloudDNS(config.createConfig(options));
};

//
// ### function CloudDNS (config)
// #### @config {loggly.Config} Configuration object for this instance.
// Constructor function for the `CloudDNS` object responsible for exposing
// the core `node-clouddns` API methods.
//
var CloudDNS = exports.CloudDNS = function (config) {
  this.config = config;
  this.authorized = false;
  this.rackspace = common.rackspace;
  
  this.domainList = new Array();
  
  
};

//
// ### function setAuth (callback)
// #### @callback {function} Continuation to respond to when complete.
// Authenticates node-cloudfiles with the options specified 
// in the Config object for this instance
//
CloudDNS.prototype.setAuth = function (callback) {
  var authOptions = {
    uri: 'https://' + this.config.auth.host + '/v1.0', 
    headers: {
      'HOST': this.config.auth.host,
      'X-AUTH-USER': this.config.auth.username,
      'X-AUTH-KEY': this.config.auth.apiKey
    }
  };

  var self = this;

  request(authOptions, function (err, res, body) {

    if (err) {
      return callback(err);
    }
   
   var statusCode = res.statusCode.toString();
   if (Object.keys(common.failCodes).indexOf(statusCode) !== -1) {
      err = new Error('Rackspace Error (' + statusCode + '): ' + common.failCodes[statusCode]);
      return callback(err, res);
   }
    
    self.authorized = true;
    self.config.serverUrl = res.headers['x-server-management-url'];
    self.config.storageUrl = res.headers['x-storage-url'];
    self.config.cdnUrl = res.headers['x-cdn-management-url'];
    self.config.authToken = res.headers['x-auth-token'];
    self.config.storageToken = res.headers['x-storage-token'];

    if (self.config.serverUrl) {
      self.config.accountId = self.config.serverUrl.split('/').pop();
      self.config.dnsUrl = 'https://' + self.config.dnsEndpoint + '/v1.0/' + self.config.accountId;
    }

    callback(null, res, self.config);

  });

};


CloudDNS.prototype.dnsUrl = function dnsUrl() {
  var args = Array.prototype.slice.call(arguments)
  return [this.config.dnsUrl].concat(args).join('/')  + '.json';
};

//
// ### function getDomains (callback)
// #### @options {Object} Options for the api request 
// Accepts options like so: {limit: 3, offset: 9, name: mydomainsearchstring }
//
CloudDNS.prototype.getDomains = function getDomains(options, callback) {
  var args = Array.prototype.slice.call(arguments),
  	  callback = args[args.length - 1];
  
  if (typeof callback !== 'function') {
  	throw new Error("This method requires a callback");
  }

  var self = this;
  
  var reqOpts = {
  	  method   : 'GET'
  	, uri      : this.dnsUrl('domains')
  	, client   : this
  }
  
  if ( (arguments.length > 1) && (typeof arguments[0] === 'object') ) {
  	reqOpts.params = {name: args[0]}
  } 
  
  this.rackspace(reqOpts, callback, function (body) {
    var result = JSON.parse(body);
	self._wrapDomains(result.domains, callback);
  });

};


//
// ### function _wrapDomains (domainArray, callback)
// #### @domainArray {Array} Array of domains as returned from the api
// #### @callback {Function}
//
CloudDNS.prototype._wrapDomains = function _wrapDomains(domainArray, callback) {
	var self = this;
	var results = [];
			
	domainArray.forEach(function (domain) {
	   results.push(new (clouddns.Domain)(self, domain));
	});
	return callback(null, results);	 
}

//
// ### function _wrapRecords (recordArray, callback)
// #### @recordArray {Array} Array of records as returned from the api
// #### @callback {Function}
//
CloudDNS.prototype._wrapRecords = function _wrapRecords(domain, recordArray, callback) {
	var self = this;
	var results = [];
	
	if (Array.isArray(recordArray)) {
		recordArray.forEach(function (record) {
	   		results.push(new (clouddns.Record)(domain, record));
		});
	}
	return callback(null, results);	 
}


//
//POST	/domains	
//
// ### function getDomains (callback)
// #### @options {Object} Options for the api request 
// Accepts options like so: {limit: 3, offset: 9, name: mydomainsearchstring }
//
CloudDNS.prototype.createDomain = function createDomain(domainObj) {
  var args = Array.prototype.slice.call(arguments),
  	  callback = args[args.length - 1];
  
  if (typeof callback !== 'function') {
  	throw new Error("This method requires a callback");
  }
  
  var self = this;
  var domainList = { domains : [] };
  
  if (Array.isArray(domainObj)) {
  	domainList.domains = domainObj;
  } else {
  	domainList.domains = [domainObj];
  }
  
  var reqOpts = {
  	  method   : 'POST'
  	, uri      : this.dnsUrl('domains')
  	, client   : this
  	, body     : domainList
  }
  
  if ( (arguments.length > 1) && (typeof arguments[0] === 'object') ) {
  	reqOpts.params = {name: args[0]}
  } 

  this.rackspace(reqOpts, callback, function (body) {
    var result = JSON.parse(body);
	self._wrapDomains(result.domains, callback);
  });

};
