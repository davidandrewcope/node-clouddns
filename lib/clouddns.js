/*
 * clouddns.js: Wrapper for node-clouddns object
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var clouddns = exports;

//
// Load package information using `pkginfo`.
//
require('pkginfo')(module, 'version');

//
// Resources
//
clouddns.Config = require('./clouddns/config').Config;

//
// Core methods
//
clouddns.createClient = require('./clouddns/core').createClient;