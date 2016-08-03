'use strict';

var A3DRuntime = require('away3d-runtime').default;

module.exports = [
    function(){
        return {
            restrict: "E",
            replace: true,

            link: function(scope, element, attrs, ctrl, transclude){
                new A3DRuntime();
            }
        }
    }
];