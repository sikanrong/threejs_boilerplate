'use strict';


var THREE = window.THREE = require('three');

var $shaders = window.$shaders = require('temp/shaders.json');

var angular = require('angular');
var mdl = angular.module('boilerplate.runtime.3js', []);

mdl.factory('3JSMain', require('./main.js'));

module.exports = mdl;