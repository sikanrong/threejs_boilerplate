'use strict';

var ThreejsMain = require('../services/threejs/main.js');

module.exports = ng.core.Directive({
    selector: 'runtime-canvas',
    providers: [ ThreejsMain ]
}).Class({
    constructor: [ng.core.ElementRef, ThreejsMain, function(el, runtime){
        this.el = el.nativeElement;
        this.runtime = runtime;
    }],

    ngOnInit: function(){
        this.runtime.main(this.el);
    }
});