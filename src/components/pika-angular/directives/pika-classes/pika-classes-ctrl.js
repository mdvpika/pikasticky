(function () {

    angular.module('pika-angular')
        .controller('PikaClassesCtrl', ['$scope', '$element', '$attrs',
            function ($scope, jQElement, $attrs) {
                $scope.$watchCollection($attrs.pikaClasses, function(newClasses, oldClasses){
                    oldClasses.map(_class => jQElement.removeClass(_class));
                    newClasses.map(_class => jQElement.addClass(_class));
                });
        }])

})();
