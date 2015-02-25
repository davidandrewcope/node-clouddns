/*
 * doamin.js: Instance of a single Rackspace DNS domain
 *
 * (C) 2010 Nodejitsu Inc.
 * (C) 2011 Andrew Cope
 * MIT LICENSE
 *
 */

var Domain = exports.Domain = function (client, details) {
  
  if (!details) {
    throw new Error("Domain must be constructed with at least basic details.")
  }
  
  this._client = client;
  this._setProperties(details);
  
};

  
Domain.prototype = {
	//GET	/domains/domainId?showRecords=true or false&showSubdomains = true or false
	//
	// ### function getDetails (callback)
	// #### @callback {Function}
	// Get additional details for the domain
	//
	getDetails : function getDetails(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  return callback( new Error("This method requires a callback"));
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot get details for unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'GET'
		  	, uri      : this._client.dnsUrl('domains', this.id) 
		  	, client   : this._client
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
		    self._setProperties(JSON.parse(body));

			self._client._wrapDomains(self.subdomains.domains, function(err, subdomains){
				self.subdomains.domains = subdomains;
				
				self._client._wrapRecords(self, self.recordsList.records, function(err, records){
					self.recordsList.records = records;

					return callback(null, self);
				});
				
			});

		});
	}
	//GET	/domains/domainId/changes?since=[date/time]
	//
	// ### function getChanges (since, callback)
	// #### @since {Date} Starting date for changes
	// #### @callback {Function}
	// Get listing of changes to the Domain
	//
	, getChanges : function getChanges(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  	  		  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot get details for unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'GET'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'changes') 
		  	, client   : this._client
		};
		
	    if ( (args.length > 1) && (typeof args[0] === 'Date') ) {
	  	  options.params = {since: args[0]}
	    } 
	    
	    this._client.rackspace(reqOpts, callback, function (body) {
		    return callback(null, JSON.parse(body));
		});
	}
	//GET	/domains/domainId/export
	//
	// ### function getExport ( callback)
	// #### @callback {Function}
	// Export the domain to BIND9 db file format
	//
	, getExport : function getExport(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot get export for unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'GET'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'export') 
		  	, client   : this._client
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
		    var result = JSON.parse(body);
		    return callback(null, result.contents);
		});
		
	}
	//POST	/domains/domainId (is this right?)
	//
	// ### function createSubDomain (domainObj, callback)
	// #### @domainObj {Function} the new Domain object to be added as a subdomain of this domain
	// #### @callback {Function}
	// Add a subdomain to this domain
	//
	, createSubDomain : function createSubDomain(domainObj, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    

		var domainList = { domains : [] };
		
		if (Array.isArray(domainObj)) {
			domainList.domains = domainObj;
		} else {
			domainList.domains = [domainObj];
		}
		
		var reqOpts = {
		  method   : 'POST'
		, uri      : this._client.dnsUrl('domains', this.id)
		, client   : this._client
		, body     : domainList
		}
		
		if ( (arguments.length > 1) && (typeof arguments[0] === 'object') ) {
			reqOpts.params = {name: args[0]}
		} 
		
		this._client.rackspace(reqOpts, callback, function (body) {
			var result = JSON.parse(body);

			self._client._wrapDomains(result.domains, function(err, subdomains){
				self.subdomains.domains = subdomains;
				
				self._client._wrapRecords(self, self.recordsList.records, function(err, records){
					return callback(null, self);
				});
				
			});
						 
			
		});
		  
	}
	//POST	/domains/import
	//
	// ### function importDomain (domainObj, callback)
	// #### @bind9data {Function} string contents of a BIND9 db file (Must be valid BIND9 syntax)
	// #### @callback {Function}
	// Import a domain from a BIND9 db file
	//
	, importDomain : function importDomain(bind9data, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    var domainProps = this._getProperties();
	    	domainProps.contentType = "BIND_9";
	    	domainProps.contents = bind9data;
	    	
	    var reqOpts = {
		  	  method   : 'POST'
		  	, uri      : this._client.dnsUrl('domains', 'import') 
		  	, client   : this._client
		  	, body     : domainProps
		};
		
	    if ( (args.length > 1) && (typeof args[0] === 'Date') ) {
	  	  options.params = {since: args[0]}
	    } 
	    
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self._setProperties(JSON.parse(body));
		    return callback(null, self);
		});
	}
	//PUT	/domains/domainId
	//
	// ### function updateDomain (details, callback)
	// #### @details {Object} merged with this object before the update
	// #### @callback {Function}
	// Update this domain
	//
	, updateDomain : function updateDomain(details, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if (!this.id) {
	      return callback( new Error("Cannot update an unsaved Domain"));
	    }
	    
	    if ( (args.length > 1) && (typeof args[0] === 'object') ) {
	  	  this._setProperties(args[0]);
	    } 
	    
	    var reqOpts = {
		  	  method   : 'PUT'
		  	, uri      : this._client.dnsUrl('domains', this.id) 
		  	, client   : this._client
		  	, body     : this._getProperties()
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self._setProperties(JSON.parse(body));
		    return callback(null, self);
		});
	}
	//DELETE	/domains/domainId?deleteSubdomains=true
	//
	// ### function removeDomain (deleteSubdomains, callback)
	// #### @deleteSubdomains {boolean} also delete subdomains, otherwise existing subdomains will become parent domains
	// #### @callback {Function}
	// Delete this domain
	//
	, removeDomain : function removeDomain(deleteSubdomains, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if ( (args.length > 1) && (typeof args[0] === 'boolean') ) {
	  	  options.params = {deleteSubdomains: args[0]}
	    } 
	    
		if (!this.id) {
	      return callback( new Error("Cannot update an unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'DELETE'
		  	, uri      : this._client.dnsUrl('domains', this.id) 
		  	, client   : this._client
		  	, body     : this._getProperties()
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body, res) {
	    	switch (res.statusCode) {
	    		case 202:
	    			return callback(null);
	    			break;
	    		case 204:
	    			return callback(new Error("Domain already gone"));
	    			break;
	    		default:
	    			return callback(new Error("Error " + res.statusCode));
	    	}

		});
	}
	//GET	/domains/domainId/subdomains
	//
	// ### function getSubDomains (callback)
	// #### @callback {Function}
	// Get an array of subdomains for this domain
	// TODO: Possibly change this to keep consistancy with getRecords() 
	//
	, getSubDomains : function getSubDomains (callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    //Return subdomains if we have them already
	    if (Array.isArray(this.subdomains)) {
	    	return callback(null, this.subdomains);
	    }
	    

	    //Attempt to get the domain details, and check for subdomains again
	    this.getDetails(function(err, domain){
	    	if (err) callback(err);
	    	return callback(null, domain.subdomains.domains);		
	    });

	}
	//
	// ### function getRecords (callback)
	// #### @callback {Function}
	// Get an array of records for this domain
	//
	, getRecords : function getRecords (callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    //Return subdomains if we have them already
	    if (Array.isArray(this.recordsList.records)) {
	    	return callback(null, this.recordsList.records);
	    }
	    

	    //Attempt to get the domain details, and check for records again
	    this.getDetails(function(err, domain){
	    	if (err) callback(err);
	    	return callback(null, domain.recordsList.records);		
	    });

	}
	//
	// ### function updateRecords (callback)
	// #### @recordObj {Object} record, or array of records to update on this domain
	// #### @callback {Function}
	// Update records for this domain
	//
	, updateRecords : function updateRecords(recordObj, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if (!this.id) {
	      return callback( new Error("Cannot add records to an unsaved Domain"));
	    }
	    
	    var recordList = { records : [] };
  
		if (Array.isArray(recordObj)) {
			recordList.records = recordObj;
		} else {
			recordList.records = [recordObj];
		}
		
	    var reqOpts = {
		  	  method   : 'PUT'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'records') 
		  	, client   : this._client
		  	, body     : recordList
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self.recordsList = JSON.parse(body);
		    return callback(null, self);
		});
		
	}
	//
	// ### function addRecords (callback)
	// #### @recordObj {Object} record, or array of records to add to this domain
	// #### @callback {Function}
	// Add records to this domain
	//
	, addRecords : function addRecords(recordObj, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if (!this.id) {
	      return callback( new Error("Cannot add records to an unsaved Domain"));
	    }
	    
	    var recordList = { records : [] };
  
		if (Array.isArray(recordObj)) {
			recordList.records = recordObj;
		} else {
			recordList.records = [recordObj];
		}
		
	    var reqOpts = {
		  	  method   : 'POST'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'records') 
		  	, client   : this._client
		  	, body     : recordList
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self.recordsList = JSON.parse(body);
		    return callback(null, self);
		});
		
	}
	//
	// ### function removeRecords (callback)
	// #### @recordObj {Object} record, or array of records to remove from this domain
	// #### @callback {Function}
	// Delete records from this domain
	//
	, removeRecords : function removeRecords(recordObj, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if (!this.id) {
	      return callback( new Error("Cannot add records to an unsaved Domain"));
	    }
	    
	    var recordIds = [];
	    
	    var recordList = { records : [] };
  
		if (Array.isArray(recordObj)) {
			recordObj.forEach(function(record) {
				recordIds.push(record.id);
			});
		} else {
			recordIds.push(recordObj.id);
		}
		
	    var reqOpts = {
		  	  method   : 'DELETE'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'records') 
		  	, client   : this._client
		  	, params   : { id: recordIds }
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body, res) {
	    	switch (res.statusCode) {
	    		case 202:
	    			return callback(null, self);
	    			break;
	    		case 204:
	    			return callback(new Error("Record already gone"));
	    			break;
	    		default:
	    			return callback(new Error("Error " + res.statusCode));
	    	}
		});
		
	}
	//
	// ### function _getProperties (callback)
	// Internal use to get the bare properties for this domain
	//
	, _getProperties : function () {
		return {
			name           : this.name
			, id           : this.id
			, comment      : this.comment
			, nameservers  : this.nameservers
			, accountId    : this.accountId
			, recordsList  : this.recordsList
			, ttl          : this.ttl
			, emailAddress : this.emailAddress
			, updated      : this.updated
			, created      : this.created
			, subdomains   : this.subdomains
		}
	}
	//
	// ### function _setProperties (callback)
	// Internal use to set the bare properties for this domain
	//
	, _setProperties: function (details) {
        this.name = details.name || null;
        this.id = details.id || null;
        this.comment = details.comment || null;
        this.nameservers = details.nameservers || []; //After getDetails 
        this.accountId = details.accountId || null;
        this.recordsList = details.recordsList || {records: []}; //After getDetails 
        this.ttl = details.ttl || null;  //Must be > 300
        this.emailAddress = details.emailAddress || null;
        this.updated = details.updated || null;
        this.created = details.created || null;
        this.subdomains = details.subdomains || {domains: []}; //After getDetails
        
        if ((details.ttl !== null) && (details.ttl < 300)) {
        	throw new Error("Time-to-live must be greater than 300ms");
        }
  },
	
};
