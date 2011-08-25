var request = require('request');

var clouddns = require('../clouddns');
var config = require('./config');
var common = require('./common');

exports.createClient = function (options) {
  return new CloudDNS(config.createConfig(options));
};

var CloudDNS = exports.CloudDNS = function (config) {
  this.config = config;
  this.authorized = false;
};

CloudDNS.prototype.setAuth = function (callback) {

  var authOptions = {
    uri: 'https://' + this.config.auth.host + '/v1.0',
    headers: {
      'host': this.config.auth.host,
      'x-auth-user': this.config.auth.username,
      'x-auth-key': this.config.auth.apiKey
    }
  };

  var self = this;

  request(authOptions, function (err, res, body) {

    if (err) {
      return callback(err);
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

CloudDNS.prototype.getDomains = function (callback) {

  var self = this;
  var url = this.dnsUrl('domains', true);

  common.rackspace(url, this, callback, function (body) {
    var results = [];
    var domains = JSON.parse(body);
    /*
     domains.forEach(function (domain) {
     results.push(new (clouddns.Domain)(self, domain));
     });
     */
    callback(null, domains);
  });

};

CloudDNS.prototype.dnsUrl = function () {
  var args = Array.prototype.slice.call(arguments);
  var json = (typeof(args[args.length - 1]) === 'boolean') && args.pop();
  return [this.config.dnsUrl].concat(args).join('/') + (json ? '.json' : '.xml');
};

