var authHosts = {
  us : 'auth.api.rackspacecloud.com',
  uk : 'lon.auth.api.rackspacecloud.com'
};

var dnsEndpoints = {
  us : 'dns.api.rackspacecloud.com',
  uk : 'lon.dns.api.rackspacecloud.com'
};

exports.createConfig = function (options) {
  return new Config(options);
};

var Config = exports.Config = function (options) {

  if (!options.auth) throw new Error('options.auth is required to create Config');

  if (options.region) {
    this.region = options.region;
  }

  this.auth = {
    username: options.auth.username,
    apiKey: options.auth.apiKey,
    host: options.auth.host || authHosts[this.region]
  };

  this.dnsEndpoint = options.dnsEndpoint || dnsEndpoints[this.region];

};

Config.prototype = {
  region: 'us'
};
