'use strict';

var angular = require('angular');

var mdl = angular.module('populis.runtime', []);

mdl.controller('psRuntimeCtrl', require('./controllers/runtime.js'));
mdl.directive('psRuntimeCanvas', require('./directives/canvas.js'));

//styles
require('./styles/runtime.sass');

module.exports = mdl;