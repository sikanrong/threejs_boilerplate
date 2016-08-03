'use strict';

var threejs_runtime = require('../threejs/main.js');

module.exports = [
    function(){
        return {
            restrict: "E",

            link: function(scope, element, attrs, ctrl, transclude){
                threejs_runtime(element[0]);
            }
        }
    }
];