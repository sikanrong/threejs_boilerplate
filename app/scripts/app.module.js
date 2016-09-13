'use strict';

ng.platformBrowser = require("@angular/platform-browser");

var AppComponent = require('./app.component.js');
var RuntimeModule = require('./modules/game_runtime/runtime.module.js');

module.exports =
    ng.core.NgModule({
            imports: [
                ng.platformBrowser.BrowserModule,
                RuntimeModule
            ],
            declarations: [ AppComponent ],
            bootstrap: [ AppComponent ]
        })
        .Class({
            constructor: function() {}
        });