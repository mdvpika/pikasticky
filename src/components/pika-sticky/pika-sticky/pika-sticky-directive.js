(function ($, angular) {
    "use strict";

    angular.module('pika-sticky')
        .directive('pikaSticky', [function () {
        return {
            restrict: 'E',
            template: '<div class="sticky-container" pika-classes="classes" ng-transclude></div>',
            controller: 'PikaStickyCtrl',
            require: '?^pikaSickyParent',
            transclude: true
        }
    }]);

})($, angular);