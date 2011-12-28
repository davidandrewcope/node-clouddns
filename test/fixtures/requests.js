exports.createDomain = function createDomain(){
	return JSON.stringify({
  "domains" : [ {
    "name" : "example.com",
    "comment" : "Optional domain comment...",
    "recordsList" : {
      "records" : [ {
        "name" : "ftp.example.com",
        "type" : "A",
        "data" : "192.0.2.8",
        "ttl" : 5771
      }, {
        "name" : "example.com",
        "type" : "A",
        "data" : "192.0.2.17",
        "ttl" : 86400
      }, {
        "name" : "example.com",
        "type" : "NS",
        "data" : "dns1.stabletransit.com",
        "ttl" : 3600
      }, {
        "name" : "example.com",
        "type" : "NS",
        "data" : "dns2.stabletransit.com",
        "ttl" : 3600
      }, {
        "name" : "example.com",
        "priority" : 5,
        "type" : "MX",
        "data" : "mail.example.com",
        "ttl" : 3600
      }, {
        "name" : "www.example.com",
        "type" : "CNAME",
        "comment" : "This is a comment on the CNAME record",
        "data" : "example.com",
        "ttl" : 5400
      } ]
    },
    "subdomains" : {
      "domains" : [ {
        "name" : "sub1.example.com",
        "comment" : "1st sample subdomain",
        "emailAddress" : "sample@rackspace.com"
      }, {
        "name" : "sub2.example.com",
        "comment" : "1st sample subdomain",
        "emailAddress" : "sample@rackspace.com"
      }, {
        "name" : "north.example.com",
        "emailAddress" : "sample@rackspace.com"
      }, {
        "name" : "south.example.com",
        "comment" : "Final sample subdomain",
        "emailAddress" : "sample@rackspace.com"
      } ]
    },
    "ttl" : 3600,
    "emailAddress" : "sample@rackspace.com"
  } ]
});
}
