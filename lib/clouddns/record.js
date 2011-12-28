
var Record = exports.Record = function (domain, details) {
  
  if (!details) {
    throw new Error("Record must be constructed with at least basic details.")
  }
  
  this._domain = domain;
  this._setProperties(details);
};

  
Record.prototype = {
	//PUT	/domains/domainId
	updateRecord : function updateRecord() {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
	}
	//DELETE	/domains/domainId?deleteSubdomains=true
	, removeRecord : function removeRecord() {
		var args = Array.prototype.slice.call(arguments),
  	  		callback = args[args.length - 1];
  	  		
	}
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