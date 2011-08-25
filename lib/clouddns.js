/*
 * clouddns.js: Wrapper for node-clouddns object
 *
 * (C) 2011 Erik Hedenström
 * MIT LICENSE
 *
 */

require.paths.unshift(__dirname);

var clouddns = exports;

//
// Load package information using `pkginfo`.
//
require('pkginfo')(module, 'version');

//
// Resources
//
clouddns.Config = require('clouddns/config').Config;

//
// Core methods
//
clouddns.createClient = require('clouddns/core').createClient;