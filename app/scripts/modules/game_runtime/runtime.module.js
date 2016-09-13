'use strict';

var ThreejsModule = require('./services/threejs/threejs.module.js');
var CanvasDirective = require('./directives/canvas.js');

require('./styles/runtime.sass'); //Add CSS

module.exports =
    ng.core.NgModule({
            imports: [ ThreejsModule ],
            declarations: [ CanvasDirective ],
            exports: [ CanvasDirective ]
        })
        .Class({
            constructor: function() {}
        });