# node-clouddns

An incomplete fork of [nodejitsu's node-cloudfiles](https://github.com/nodejitsu/node-cloudfiles), ripped apart and refitted for Rackspace Cloud DNS API.
WARNING: This could very well break your rackspace account, I am not responsible. Don't say I didn't warn you.

## Installation

This module is not yet available via npm. (Comming soon)
<!--
This is not yet pushed to npm
### Installing npm (node package manager)
``` bash
  $ curl http://npmjs.org/install.sh | sh
```

### Installing node-clouddns
``` bash
  $ npm install clouddns
```
-->

### [Getting Rackspace Account][3]


## Usage

The node-clouddns library is compliant with the [Rackspace clouddns API][0]. Using node-clouddns is easy for a variety of scenarios: authenticating, creating and working with both domains and DNS records.

### Getting Started
Before we can do anything with clouddns, we have to create a client with valid credentials. clouddns will authenticate for you automatically: 

``` js 
  var clouddns = require('clouddns');
  var config = {
    auth : {
      username: 'your-username',
      apiKey: 'your-api-key'
    }
  };
  
  var client = clouddns.createClient(config);
```

### Working with the client

``` js 
  // Authenticate
  client.setAuth(function () {
  
  // Listing domains for your account
    client.getDomains(function (err, domainArray) {
      	console.dir(domainArray);
    });
    
  // Creating a new domain
    var newDomain = {
  	  "name" : "example.com",
      "comment" : "Optional domain comment...",
      "ttl" : 3600,
      "emailAddress" : "sample@rackspace.com"
    };
    
    client.createDomain(newDomain, function(err, domainArray){
      console.dir(domainArray);
    });
    
    // Search by name or page through a long list
    var searchOpts = {limit: 3, offset: 9, name: "mydomainsearchstring" };
    
    client.getDomains(searchOpts, function (err, domainArray) {
      	console.dir(domainArray);
    });
    
  });
```

### Working with the domains
All the expected CRUD methods that you would expect are available to the domain object
We also have the ability to import and export BIND9 db files, check out the tests for more details

``` js 
  // Authenticate
  client.setAuth(function () {
  
  // Listing domains for your account
    client.getDomains(function (err, domainArray) {
    	
      // All domains returned are wrapped with our helper objects
      domainArray[0].getDetails(function(err, domain) {
      	//Domains returned from the client.getDomais() function are bare lists, 
      	//  so we call getDetails() to also get the subdomains and domain records
      	console.dir(domain.recordsList);
      }
      
      //Helper methods call getDetails() automatically on the domain first if the records are not cached
      
      domainArray[0].getSubDomains(function(err, domain) {
      	console.dir(domain.subdomains.domains);
      	
      	//Subdomains are still domains, so all the same methods apply so:
      	domain.subdomains.domains[0].comment = "I'm updating this subdomain";
      	domain.subdomains.domains[0].updateDomain(function(err, domain){
      	//Still the parent domain
      		console.dir(domain);
      	});
      	
      	//Or pass bare object, we're crazy like that
      	domain.subdomains.domains[0].updateDomain({comment: "My fav domain", ... }function(err, domain){
      		console.dir(domain);
      	});
      	
      	//Change history for the domain, pass in an optional Date() to limit the "since" time
      	domain.getChanges(function(err, changes){
      		console.dir(changes);
      	});
      	
      	
      	//Delete the domain
      	domain.removeDomain(function(err){
      	  if (err) {
      	  	console.log("Whoops can't delete" + err);
      	  }
      	});
      
      }); 
      
    });
    
  });
```


### Working with domain records
Updating and deleting can be done directly on the record objects, and bulk updates are done via the domain
Again you should really run and read the tests, for more info

``` js 
  // Authenticate
  client.setAuth(function () {
  
  // Listing domains for your account
    client.getDomains(function (err, domainArray) {
    	
      // Get the records
      domainArray[0].getRecords(function(err, records) {
      
      	//Add a comment
        records[0].comment = "Bad MX record, I should just delete it";
      	records[0].updateRecord(function(){
      		if (!err) console.log("success");
      		
      		// Aww, just delete it already
      		records[0].removeRecord(function(){
	      		if (!err) console.log("success");
	      	});
      	});
      	
      	
      });
      
      // Bulk record update, first parameter could be a Record Instance, or Array of records
      // Note all bulk updating functions can take either our Domain or Record instances, or just simple objects and arrays
      domainArray[1].addRecords( recordArray, function(err, domain) {
        console.dir(domain);
      });  
      
      
    });
    
  });
```

## Authentication Service

Use the 'host' key in the auth configuration to specify the url to use for authentication:

``` js 
  var clouddns = require('clouddns');
  var config = {
    auth : {
      username: 'your-username',
      apiKey: 'your-api-key',
      host : "lon.auth.api.rackspacecloud.com"
    }
  };

  var client = clouddns.createClient(config);
``` 

## Run Tests
All of the node-clouddns tests are written in [vows][2], and cover all of the use cases described above. You will need to add your Rackspace API username and API key to test/fixtures/test-config.json before running tests:

``` js
  {
    "auth": {
      "username": "your-username",
      "apiKey": "your-apikey"
    }
  }
```

Once you have valid Rackspace credentials you can run tests with npm and [vows][2]:

``` bash 
  npm test
```
## Credits

#### Author: [Andrew Cope](https://github.com/davidandrewcope)
#### Contributors: \[This space available for purchase, cost 3 easy payments of pull requests :-) \]

### Based on the node-cloudfiles library by the following

#### Author: [Charlie Robbins](http://www.charlierobbins.com)
#### Contributors: [Fedor Indutny](http://github.com/donnerjack13589), [aaronds](https://github.com/aaronds)

[0]: http://docs.rackspace.com/cdns/api/v1.0/cdns-devguide/content/overview.html
[1]: http://nodejitsu.com
[2]: http://vowsjs.org
[3]: http://www.rackspacecloud.com/1469-0-3-13.html
