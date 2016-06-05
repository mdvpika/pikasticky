(function () {

    angular.module('pika-sticky')
        .factory('pikaStickyFactoryService', [function () {
            function PikaStickyFactoryService(stateListener, jQSticky, jQContainer, jQParent) {

                function calculateState(parentLocation) {
                    let containerRelativeLocation = jQContainer.relativeLocation(jQParent);

                    let stateL = undefined;
                    let jQStickyHeight = jQSticky.height();
                    let jQParentHeight = jQParent.height();
                    let verticalDirectionArray = ['top', 'bottom'];
                    for (let i = 0; i < 2; ++i) {
                        let verticalDirection = verticalDirectionArray[i];
                        let oppositeDirection = verticalDirectionArray[1 - i];

                        if (-parentLocation[verticalDirection] > containerRelativeLocation[verticalDirection]) {
                            if (-parentLocation[verticalDirection] < jQParentHeight - jQStickyHeight) {
                                stateL = 'sticky-' + verticalDirection;
                            }
                            else {
                                stateL = 'end-' + oppositeDirection;
                            }
                        }
                    }
                    if (stateL === undefined) {
                        stateL = 'normal';
                    }

                    updateState(stateL);
                }

                let updateState = ((initialState) => {
                    let state = initialState;
                    return function setState(stateP) {

                        if (state !== stateP) {
                            let oldState = state;
                            state = stateP;
                            stateListener(state, oldState);
                        }
                    }
                })(undefined);

                calculateState(jQParent.location());
                jQParent.relocate(calculateState);

            }

            return PikaStickyFactoryService;
        }]);

})();
