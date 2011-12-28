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
clouddns.Domain = require('./clouddns/domain').Domain;
clouddns.Record = require('./clouddns/record').Record;

//
// Core methods
//
clouddns.createClient = require('./clouddns/core').createClient;