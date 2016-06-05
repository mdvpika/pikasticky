(function () {

    angular.module('pika-angular', [])
        .factory('pikaAngularJQueryExtensionRunnerService',
            ['$rootScope', function ($rootScope) {
                return function (eventRegistererNameArray) {
                    for (let i = 0 ; i < eventRegistererNameArray.length; ++i) {
                        let eventRegistererName = eventRegistererNameArray[i];
                        let eventRegisterer = $.fn[eventRegistererName];
                        $.fn[eventRegistererName] = function (listener) {
                            let appliedListener = function (...args) {
                                $rootScope.$apply(function () {
                                    listener(...args);
                                });
                            };
                            eventRegisterer.call(this, appliedListener);
                        }
                    }
                }
            }]);


})();
