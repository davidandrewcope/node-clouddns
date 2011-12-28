/*
 * record.js: Instance of a single Rackspace DNS record
 *
 * (C) 2010 Nodejitsu Inc.
 * (C) 2011 Andrew Cope
 * MIT LICENSE
 *
 */
var Record = exports.Record = function (domain, details) {
  
  if (!details) {
    throw new Error("Record must be constructed with at least basic details.")
  }
  
  this._domain = domain;
  this._setProperties(details);
};

  
Record.prototype = {
	//PUT	/domains/domainId/records/recordId
	//
	// ### function updateRecord (details, callback)
	// #### @details {Object} merged with this object before the update
	// #### @callback {Function}
	// Update this domain record
	//
	updateRecord : function updateRecord(details) {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if ( (args.length > 1) && (typeof args[0] === 'object') ) {
	  	  this._setProperties(args[0]);
	    } 
	    
		if (!this._domain.id) {
	      return callback( new Error("Cannot update an unsaved Domain"));
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot update an unsaved Record"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'PUT'
		  	, uri      : this._client.dnsUrl('domains', this._domain.id, 'records', this.id) 
		  	, client   : this._domain._client
		  	, body     : this._getProperties()
		  }
		  
	    this._client.rackspace(reqOpts, callback, function (body) {
	    	self_domain.recordsList = JSON.parse(body);
		    return callback(null, self);
		});
  	  		
	}
	//DELETE	/domains/domainId/records/recordId
	//
	// ### function removeRecord (callback)
	// #### @callback {Function}
	// Delete this domain record
	//
	, removeRecord : function removeRecord() {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1]
  	  		self = this;
  
	    if (typeof callback !== 'function') {
	  	  throw new Error("This method requires a callback");
	    }
	    
		if (!this._domain.id) {
	      return callback( new Error("Cannot update an unsaved Domain"));
	    }
	    
	    if (!this.id) {
	      return callback( new Error("Cannot update an unsaved Record"));
	    }
	    
	    var reqOpts = {
		  	  method   : 'DELETE'
		  	, uri      : this._client.dnsUrl('domains', this._domain.id, 'records', this.id) 
		  	, client   : this._domain._client
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
	//
	// ### function _getProperties (callback)
	// Internal use to get the bare properties for this record
	//
	, _getProperties : function () {
		return {
			name : this.name
			, id : this.id
			, type : this.type
			, data : this.data
			, ttl : this.ttl
			, updated : this.updated
			, created : this.created
		}
	}
	//
	// ### function _setProperties (callback)
	// Internal use to set the bare properties for this record
	//
	, _setProperties: function (details) {
        this.name = details.name || null;
        this.id = details.id || null;
        this.type = details.type || null;
        this.data = details.data || null;
        this.ttl = details.ttl || null;  //Must be > 300
        this.updated = details.updated || null;
        this.created = details.created || null;
  },
	
};
