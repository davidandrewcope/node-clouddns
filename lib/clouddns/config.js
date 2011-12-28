/*
 * config.js: Configuration information for your Rackspace Cloud account
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var authHosts = {
  us : 'auth.api.rackspacecloud.com',
  uk : 'lon.auth.api.rackspacecloud.com'
};

var dnsEndpoints = {
  us : 'dns.api.rackspacecloud.com',
  uk : 'lon.dns.api.rackspacecloud.com'
};

//
// function createConfig (defaults) 
//   Creates a new instance of the configuration 
//   object based on default values
//
exports.createConfig = function (options) {
  return new Config(options);
};

//
// Config (defaults) 
//   Constructor for the Config object
//
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
