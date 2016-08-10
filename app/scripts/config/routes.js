'use strict';

module.exports = ["$stateProvider", "$urlRouterProvider",
    function(
        $stateProvider,
        $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        //Homepage
        $stateProvider.state('home', {
            url: '/',

            views: {
                mainContent: {
                    controller: 'runtimeCtrl',
                    templateUrl: '/scripts/modules/game_runtime/views/runtime.html'
                }
            }
        });

    }
]