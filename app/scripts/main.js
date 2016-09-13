'use strict';

var ng = window.ng = ng || {};
ng.core = require('@angular/core');
ng.platformBrowserDynamic = require('@angular/platform-browser-dynamic');

require('zone.js');
require('reflect-metadata');

//grand entry point for the app...
document.addEventListener('DOMContentLoaded', function() {
    ng.platformBrowserDynamic
        .platformBrowserDynamic()
        .bootstrapModule(require('./app.module.js'));
});