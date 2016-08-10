'use strict';

module.exports = [
    '3JSMain',
    function(ThreejsRuntime){
        return {
            restrict: "E",

            link: function(scope, element, attrs, ctrl, transclude){
                var runtime = new ThreejsRuntime(element[0]);
            }
        }
    }
];