'use strict';

var angular = require('angular');

require('./services/threejs/index.js');

var mdl = angular.module('boilerplate.runtime', ['boilerplate.runtime.3js']);

mdl.controller('runtimeCtrl', require('./controllers/runtime.js'));
mdl.directive('runtimeCanvas', require('./directives/canvas.js'));

//styles
require('./styles/runtime.sass');

module.exports = mdl;