
exports.getDomains = function getDomains(){
		return JSON.stringify({
		  "domains" : [ {
		    "name" : "example.com",
		    "id" : 2725233,
		    "comment" : "Optional domain comment...",
		    "accountId" : 1234,
		    "ttl" : 3600,
		    "emailAddress" : "sample@rackspace.com",
		    "updated" : "2011-06-24T01:23:15.000+0000",
		    "created" : "2011-06-24T01:12:51.000+0000"
		  }, {
		    "name" : "sub1.example.com",
		    "id" : 2725257,
		    "comment" : "1st sample subdomain",
		    "accountId" : 1234,
		    "emailAddress" : "sample@rackspace.com",
		    "updated" : "2011-06-23T03:09:34.000+0000",
		    "created" : "2011-06-23T03:09:33.000+0000"
		  }, {
		    "name" : "sub2.example.com",
		    "id" : 2725258,
		    "comment" : "1st sample subdomain",
		    "accountId" : 1234,
		    "emailAddress" : "sample@rackspace.com",
		    "updated" : "2011-06-23T03:52:55.000+0000",
		    "created" : "2011-06-23T03:52:55.000+0000"
		  }, {
		    "name" : "north.example.com",
		    "id" : 2725260,
		    "accountId" : 1234,
		    "emailAddress" : "sample@rackspace.com",
		    "updated" : "2011-06-23T03:53:10.000+0000",
		    "created" : "2011-06-23T03:53:09.000+0000"
		  }, {
		    "name" : "south.example.com",
		    "id" : 2725261,
		    "comment" : "Final sample subdomain",
		    "accountId" : 1234,
		    "emailAddress" : "sample@rackspace.com",
		    "updated" : "2011-06-23T03:53:14.000+0000",
		    "created" : "2011-06-23T03:53:14.000+0000"
		  }, {
		    "name" : "region2.example.net",
		    "id" : 2725352,
		    "accountId" : 1234,
		    "updated" : "2011-06-23T20:21:06.000+0000",
		    "created" : "2011-06-23T19:24:27.000+0000"
		  }, {
		    "name" : "example.org",
		    "id" : 2718984,
		    "accountId" : 1234,
		    "updated" : "2011-05-03T14:47:32.000+0000",
		    "created" : "2011-05-03T14:47:30.000+0000"
		  }, {
		    "name" : "rackspace.example",
		    "id" : 2722346,
		    "accountId" : 1234,
		    "updated" : "2011-06-21T15:54:31.000+0000",
		    "created" : "2011-06-15T19:02:07.000+0000"
		  }, {
		    "name" : "dnsaas.example",
		    "id" : 2722347,
		    "comment" : "Sample comment",
		    "accountId" : 1234,
		    "updated" : "2011-06-21T15:54:31.000+0000",
		    "created" : "2011-06-15T19:02:07.000+0000"
		  } ],
		  "links" : [ {
		    "content" : "",
		    "href" : "https://dns.api.rackspacecloud.com/v1.0/1234/domains?limit=10&offset=10",
		    "rel" : "previous"
		  }, {
		    "content" : "",
		    "href" : "https://dns.api.rackspacecloud.com/v1.0/1234/domains?limit=10&offset=30",
		    "rel" : "next"
		  } ],
		  "totalEntries" : 114
		});
	}

exports.createDomain = function createDomain() {
	return JSON.stringify({
	  "domains" : [ {
		"name" : "example.com",
		"comment" : "Optional domain comment...",
		"nameservers" : [ {
		  "name" : "ns.rackspace.com"
		}, {
		  "name" : "ns2.rackspace.com"
		} ],
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
	  } ],
	  "totalEntries" : 114
	}); 

};


exports.getDetails = function getDetails() {
	return JSON.stringify({
  "name" : "example.com",
  "id" : 2725233,
  "comment" : "Optional domain comment...",
  "nameservers" : [ {
    "name" : "ns.rackspace.com"
  }, {
    "name" : "ns2.rackspace.com"
  } ],
  "accountId" : 1234,
  "recordsList" : {
    "totalEntries" : 6,
    "records" : [ {
      "name" : "ftp.example.com",
      "id" : "A-6817754",
      "type" : "A",
      "data" : "192.0.2.8",
      "ttl" : 5771,
      "updated" : "2011-05-19T13:07:08.000+0000",
      "created" : "2011-05-18T19:53:09.000+0000"
    }, {
      "name" : "example.com",
      "id" : "A-6822994",
      "type" : "A",
      "data" : "192.0.2.17",
      "ttl" : 86400,
      "updated" : "2011-06-24T01:12:52.000+0000",
      "created" : "2011-06-24T01:12:52.000+0000"
    }, {
      "name" : "example.com",
      "id" : "NS-6251982",
      "type" : "NS",
      "data" : "dns1.stabletransit.com",
      "ttl" : 3600,
      "updated" : "2011-06-24T01:12:51.000+0000",
      "created" : "2011-06-24T01:12:51.000+0000"
    }, {
      "name" : "example.com",
      "id" : "NS-6251983",
      "type" : "NS",
      "data" : "dns2.stabletransit.com",
      "ttl" : 3600,
      "updated" : "2011-06-24T01:12:51.000+0000",
      "created" : "2011-06-24T01:12:51.000+0000"
    }, {
      "name" : "example.com",
      "id" : "MX-3151218",
      "priority" : 5,
      "type" : "MX",
      "data" : "mail.example.com",
      "ttl" : 3600,
      "updated" : "2011-06-24T01:12:53.000+0000",
      "created" : "2011-06-24T01:12:53.000+0000"
    }, {
      "name" : "www.example.com",
      "id" : "CNAME-9778009",
      "type" : "CNAME",
      "comment" : "This is a comment on the CNAME record",
      "data" : "example.com",
      "ttl" : 5400,
      "updated" : "2011-06-24T01:12:54.000+0000",
      "created" : "2011-06-24T01:12:54.000+0000"
    } ]
  },
  "subdomains" : {
    "domains" : [ {
      "name" : "sub1.example.com",
      "id" : 2725257,
      "comment" : "1st sample subdomain",
      "emailAddress" : "sample@rackspace.com",
      "updated" : "2011-06-23T03:09:34.000+0000",
      "created" : "2011-06-23T03:09:33.000+0000"
    }, {
      "name" : "sub2.example.com",
      "id" : 2725258,
      "comment" : "1st sample subdomain",
      "emailAddress" : "sample@rackspace.com",
      "updated" : "2011-06-23T03:52:55.000+0000",
      "created" : "2011-06-23T03:52:55.000+0000"
    }, {
      "name" : "north.example.com",
      "id" : 2725260,
      "emailAddress" : "sample@rackspace.com",
      "updated" : "2011-06-23T03:53:10.000+0000",
      "created" : "2011-06-23T03:53:09.000+0000"
    }, {
      "name" : "south.example.com",
      "id" : 2725261,
      "comment" : "Final sample subdomain",
      "emailAddress" : "sample@rackspace.com",
      "updated" : "2011-06-23T03:53:14.000+0000",
      "created" : "2011-06-23T03:53:14.000+0000"
    } ],
    "totalEntries" : 4
  },
  "ttl" : 3600,
  "emailAddress" : "sample@rackspace.com",
  "updated" : "2011-06-24T01:23:15.000+0000",
  "created" : "2011-06-24T01:12:51.000+0000"
}); 

};

exports.getChanges = function getChanges() {
	return JSON.stringify({
  "from" : "2011-09-13T05:00:00.000+0000",
  "to" : "2011-09-19T21:36:01.000+0000",
  "totalEntries" : 4,
  "changes" : [ {
    "domain" : "rs.example.com",
    "action" : "update",
    "changeDetails" : [ {
      "field" : "serial_number",
      "newValue" : "1315930302",
      "originalValue" : "1315927395"
    }, {
      "field" : "updated_at",
      "newValue" : "Tue Sep 13 16:11:42 UTC 2011",
      "originalValue" : "Tue Sep 13 15:23:15 UTC 2011"
    } ],
    "accountId" : 1234,
    "targetId" : 45678,
    "targetType" : "Domain"
  }, {
    "domain" : "rs.example.com",
    "action" : "create",
    "changeDetails" : [ {
      "field" : "created_at",
      "newValue" : "Tue Sep 13 16:11:42 UTC 2011",
      "originalValue" : ""
    }, {
      "field" : "ttl",
      "newValue" : "3600",
      "originalValue" : ""
    }, {
      "field" : "fqdn",
      "newValue" : "rs.example.com",
      "originalValue" : ""
    }, {
      "field" : "updated_at",
      "newValue" : "Tue Sep 13 16:11:42 UTC 2011",
      "originalValue" : ""
    }, {
      "field" : "destination",
      "newValue" : "mail.rs.example.com",
      "originalValue" : ""
    }, {
      "field" : "priority",
      "newValue" : "1",
      "originalValue" : ""
    }, {
      "field" : "id",
      "newValue" : "222222",
      "originalValue" : ""
    }, {
      "field" : "zone_id",
      "newValue" : "45678",
      "originalValue" : ""
    } ],
    "targetId" : 222222,
    "targetType" : "MX Record"
  }, {
    "domain" : "rs.example.com",
    "action" : "update",
    "changeDetails" : [ {
      "field" : "serial_number",
      "newValue" : "1315927395",
      "originalValue" : "1310656481"
    }, {
      "field" : "updated_at",
      "newValue" : "Tue Sep 13 15:23:15 UTC 2011",
      "originalValue" : "Thu Jul 14 15:14:41 UTC 2011"
    } ],
    "accountId" : 1234,
    "targetId" : 45678,
    "targetType" : "Domain"
  }, {
    "domain" : "rs.example.com",
    "action" : "create",
    "changeDetails" : [ {
      "field" : "created_at",
      "newValue" : "Tue Sep 13 15:23:15 UTC 2011",
      "originalValue" : ""
    }, {
      "field" : "ttl",
      "newValue" : "3600",
      "originalValue" : ""
    }, {
      "field" : "fqdn",
      "newValue" : "*.rs.example.com",
      "originalValue" : ""
    }, {
      "field" : "updated_at",
      "newValue" : "Tue Sep 13 15:23:15 UTC 2011",
      "originalValue" : ""
    }, {
      "field" : "destination",
      "newValue" : "rs.example.com",
      "originalValue" : ""
    }, {
      "field" : "id",
      "newValue" : "87654",
      "originalValue" : ""
    }, {
      "field" : "zone_id",
      "newValue" : "45678",
      "originalValue" : ""
    } ],
    "targetId" : 87654,
    "targetType" : "CNAME Record"
  } ]
}); 

};

exports.getExport = function getExport() {
	return JSON.stringify({
  "id" : 2725339,
  "contentType" : "BIND_9",
  "contents" : "\n    \t\texample.net. 3600 IN SOA ns.rackspace.com.\n\t\t\tsample@rackspace.com. 1308874739 3600 3600 3600 3600\n\t\t\texample.net. 86400 IN A 110.11.12.16\n\t\t\texample.net. 3600 IN MX 5 mail2.example.net.\n\t\t\twww.example.net. 5400 IN CNAME example.net.\n\t\t\texample.net. 5600 IN NS dns1.stabletransit.com.\n\t\t\texample.net. 5600 IN NS dns2.stabletransit.com.\t\t\t\n\t\t",
  "accountId" : 1234
}); 

};
