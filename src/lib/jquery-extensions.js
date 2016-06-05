(function () {
    'use strict';
    /*
     listen to relocation events relative to the viewport
     */

    let jQWindow = $(window);

    $.fn.relocate = function (eventHandler) {
        let _this = this;
        // wrap every element in jQuery object
        let thisArray = Array.prototype.map.call(_this, $);

        let watchFnMap = createWatchFnMap();
        let watchListenerFnMap = createWatchListenerFnMap();

        let watchMultiFn = setUpWatchers(watchFnMap, watchListenerFnMap);

        function createWatchFnMap() {
            let watchFnMap = [];
            for (let i = 0; i < _this.length; ++i) {
                let watchFn = createWatchFn(i);
                watchFnMap.push(watchFn);
            }
            return watchFnMap;
        }

        function createWatchFn(i) {
            let jQthisi = thisArray[i];
            return function () {
                return jQthisi.location()
            }
        }

        function createWatchListenerFnMap() {
            let watchListenerFnMap = [];
            for (let i = 0; i < _this.length; ++i) {
                let watchListenerFn = createWatchListenerFn(i);
                watchListenerFnMap.push(watchListenerFn);
            }
            return watchListenerFnMap;
        }

        function createWatchListenerFn(i) {
            return function (location) {
                eventHandler.call(_this[i], location);
            }
        }

        function attachListener(listener) {
            if (window.requestAnimationFrame) {
                jQWindow.onAmimationFrame(listener);
            } else {
                // doesn't work with jQWindow.resize(listener)
                jQWindow.resize(x => listener());
                setInterval(listener, 100);
                _this.parentScroll(function () {
                    console.log('parent scroll');
                    let i = Array.prototype.findIndex.call(_this, _this_i => _this_i[0] === this[0]);
                    listener[i]();
                });
            }
        }

        attachListener(watchMultiFn);
    };

    $.fn.location = function () {
        if (this.length !== 0) {
            let boundingClientRect = this[0].getBoundingClientRect();

            let top = boundingClientRect.top;
            let left = boundingClientRect.left;
            let right = window.innerWidth - boundingClientRect.right;
            let bottom = window.innerHeight - boundingClientRect.bottom;

            return {
                top: top,
                left: left,
                right: right,
                bottom: bottom
            };
        }
    };

    $.fn.relativeLocation = function (jQParent) {
        if (this.length !== 0) {
            let location = this.location();
            let parentLocation = jQParent.location();
            return __.minus(location, parentLocation);
        }
    };

    if (window.requestAnimationFrame) {
        let animationLoop = undefined;

        $.fn.onAmimationFrame = function (listener) {
            if (!animationLoop) {
                animationLoop = new Loop(window.requestAnimationFrame);
            }
            animationLoop.add(listener);
        };

        $.fn.offAnimationFrame = function (listener) {
            animationLoop.remove(listener);
        };
    }

    $.fn.parentScroll = function (listener) {
        this.each(function () {
            let _this = this;
            let jQthis = $(this);
            let parent = jQthis.parent();
            while (true) {
                if (parent[0] !== document) {
                    if (parent.isScrollable()) {
                        parent.scroll(listener);
                    }
                    parent = parent.parent();
                } else {
                    break;
                }
            }
            jQWindow.scroll(function () {
                listener.call(_this);
            });
        })
    };

    $.fn.isScrollable = function () {
        let overflowProps = ['overflow', 'overflow-y', 'overflow-x']
        for (let i = 0; i < overflowProps.length; ++i) {
            let overflowProp = overflowProps[i];
            let overflowVal = this.css(overflowProp);
            if (overflowVal === 'scroll' || overflowVal === 'auto') {
                return true;
            }
        }
    };

    function setUpWatchers(watchFnArray, listenerFnArray) {

        function combiner(watchFn, listenerFn) {
            // initial watch value
            let watchedVal = watchFn();

            return function combinedFunction() {
                let oldWatchedVal = watchedVal;
                let newWatchedVal = watchFn();
                if (!__.deepEquals(oldWatchedVal, newWatchedVal)) {
                    listenerFn(newWatchedVal);
                    watchedVal = newWatchedVal;
                }
            }
        }

        let mergedFnArray = __.combine(combiner, watchFnArray, listenerFnArray);
        return createMultiFunction(mergedFnArray);
    }

})();