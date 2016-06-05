(function () {
    'use strict';

    angular.module('pika-sticky').controller('PikaStickyCtrl',
        ['$scope', '$element', '$attrs', 'pikaStickyFactoryService',

            function ($scope, jQContainer, $attrs, pikaStickyFactoryService) {

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

                    $scope.classes = classes;
                }

                function isStickyState(state) {
                    return state.startsWith('sticky');
                }

                function isEndState(state) {
                    return state.startsWith('end');
                }

                let PikaParentStickyCtrl = jQContainer.controller('pikaParentSticky');
                PikaParentStickyCtrl = PikaParentStickyCtrl || new DefaultPikaParentStickyCtrl();
                let jQParent = PikaParentStickyCtrl.getJQElement();
                let jQSticky = jQContainer.children();
                $scope.classes = [];
                
                pikaStickyFactoryService(stateListener, jQSticky, jQContainer, jQParent);
            }
        ]);
})();
