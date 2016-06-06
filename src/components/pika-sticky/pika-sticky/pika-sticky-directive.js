(function () {
    "use strict";

    angular.module('pika-sticky')
        .directive('pikaSticky', ['pikaStickyFactoryService', function (pikaStickyFactoryService) {
            function linkFn(scope, jQDirective, attrs, PikaParentStickyCtrl){
                function DefaultPikaParentStickyCtrl() {
                    function getJQElement() {
                        return $('body');
                    }

                    this.getJQElement = getJQElement
                }

                function stateListener(newState, oldState) {
                    let classes = [];

                    if (isStickyState(newState)) {
                        classes.push('sticky');
                        if (newState === 'sticky-top') {
                            classes.push('sticky-top');
                        }
                        else {
                            classes.push('sticky-bottom');
                        }
                    }
                    else if (isEndState(newState)) {
                        classes.push('end');
                        if (newState === 'end-top') {
                            classes.push('end-top');
                        }
                        else if (newState === 'end-bottom') {
                            classes.push('end-bottom');
                        }
                    }
                    // else (newState === normal){
                    // // no class added
                    // }

                    scope.classes = classes;
                }

                function isStickyState(state) {
                    return state.startsWith('sticky');
                }

                function isEndState(state) {
                    return state.startsWith('end');
                }

                PikaParentStickyCtrl = PikaParentStickyCtrl || new DefaultPikaParentStickyCtrl();
                let jQParent = PikaParentStickyCtrl.getJQElement();
                let jQSticky = jQDirective.children();
                scope.classes = [];

                pikaStickyFactoryService(stateListener, jQSticky, jQDirective, jQParent);
            }

            return {
                restrict: 'E',
                template: '<div class="sticky-container" pika-classes="classes" ng-transclude></div>',
                require: '?^pikaParentSticky',
                transclude: true,
                link: linkFn
            }
        }]);

})();