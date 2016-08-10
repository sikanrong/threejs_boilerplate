'use strict';

var angular = window.angular = require('angular');

require('angular-ui-router');
require('ocLazyLoad');
require('./modules/game_runtime/index.js');

var app_module = angular.module('boilerplate', [
    //routing
    'ui.router',
    'oc.lazyLoad',

    //game modules
    'boilerplate.runtime'
]);

app_module.config(require("scripts/config/routes.js"));