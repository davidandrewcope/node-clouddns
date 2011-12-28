/*
 * doamin.js: Instance of a single Rackspace DNS domain
 *
 * (C) 2010 Nodejitsu Inc.
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
	getDetails : function getDetails(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  return callback( new Error("This method requires a callback"));
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot get details for unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'GET'
		  	, uri      : this._client.dnsUrl('domains', this.id) 
		  	, client   : this
		  }
		  
		var self = this;
	    this._client.rackspace(reqOpts, callback, function (body) {
		    self._setProperties(JSON.parse(body));
		    return callback(null, self);
		});
	}
	//GET	/domains/domainId/changes?since=[date/time]
	, getChanges : function getChanges(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  	  		  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot get details for unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'GET'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'changes') 
		  	, client   : this
		};
		
	    if ( (args.length > 1) && (typeof args[0] === 'Date') ) {
	  	  options.params = {since: args[0]}
	    } 
	    
	    this._client.rackspace(reqOpts, callback, function (body) {
		    return callback(null, JSON.parse(body));
		});
	}
	//GET	/domains/domainId/export
	, getExport : function getExport(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot get export for unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'GET'
		  	, uri      : this._client.dnsUrl('domains', this.id, 'export') 
		  	, client   : this
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
		    var result = JSON.parse(body);
		    return callback(null, result.contents);
		});
		
	}
	//POST	/domains/domainId (is this right?)
	, createSubDomain : function createSubDomain(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		return callback(new Error("This method is not yet implemented."), this);
	}
	//POST	/domains/import
	, importDomain : function importDomain(bind9data, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
	    var domainProps = this._getProperties();
	    	domainProps.contentType = "BIND_9";
	    	domainProps.contents = bind9data;
	    	
	    var reqOpts = {
		  	  method   : 'POST'
		  	, uri      : this._client.dnsUrl('domains', 'import') 
		  	, client   : this
		  	, body     : domainProps
		};
		
	    if ( (args.length > 1) && (typeof args[0] === 'Date') ) {
	  	  options.params = {since: args[0]}
	    } 
	    
	    var self = this;
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self._setProperties(JSON.parse(body));
		    return callback(null, self);
		});
	}
	//PUT	/domains/domainId
	, updateDomain : function updateDomain(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if (!this.id) {
	      return callback( new Error("Cannot update an unsaved Domain"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'PUT'
		  	, uri      : this._client.dnsUrl('domains', this.id) 
		  	, client   : this
		  	, body     : this._getProperties()
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self._setProperties(JSON.parse(body));
		    return callback(null, self);
		});
	}
	//DELETE	/domains/domainId?deleteSubdomains=true
	, removeDomain : function removeDomain(deleteSubdomains, callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if ( (args.length > 1) && (typeof args[0] === 'boolean') ) {
	  	  options.params = {deleteSubdomains: args[0]}
	    } 
	    
		return callback(new Error("This method is not yet implemented."));
	}
	//GET	/domains/domainId/subdomains
	, getSubDomains : function getSubDomains (callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		return callback(new Error("This method is not yet implemented."), this);
	}
	, addRecord : function addRecord(callback) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		return callback(new Error("This method is not yet implemented."), this);
		
	}, _getProperties : function () {
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
		}
	}
	, _setProperties: function (details) {
        this.name = details.name || null;
        this.id = details.id || null;
        this.comment = details.comment || null;
        this.nameservers = details.nameservers || []; //After getDetails 
        this.accountId = details.accountId || null;
        this.recordsList = details.recordsList || []; //After getDetails 
        this.ttl = details.ttl || null;  //Must be > 300
        this.emailAddress = details.emailAddress || null;
        this.updated = details.updated || null;
        this.created = details.created || null;
        
        if ((details.ttl !== null) && (details.ttl < 300)) {
        	throw new Error("Time-to-live must be greater than 300ms");
        }
  },
	
};