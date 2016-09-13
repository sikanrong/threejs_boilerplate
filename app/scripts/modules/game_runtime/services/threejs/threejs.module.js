'use strict';

var THREE = window.THREE = require('three');

var $shaders = window.$shaders = require('temp/shaders.json');

var ThreejsMain = require('./main.js');

module.exports =
    ng.core.NgModule({
        providers: [ ThreejsMain ]
    }).Class({
        constructor: function(){}
    });