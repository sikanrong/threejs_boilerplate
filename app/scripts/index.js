'use strict';

var angular = window.angular = require('angular');

require('angular-ui-router');
require('ocLazyLoad');
require('./modules/game_runtime/index.js');

var app_module = angular.module('populis', [
    //routing
    'ui.router',
    'oc.lazyLoad',

    //game modules
    'populis.runtime'
]);

app_module.config(require("config/routes.js"));