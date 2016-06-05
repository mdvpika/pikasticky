(function(){
    'use strict';

    angular.module('pika-sticky')
        .directive('pikaParentSticky', [function(){
            return {
                restrict:'A',
                controller: 'PikaParentStickyCtrl'
            }
        }])

})();