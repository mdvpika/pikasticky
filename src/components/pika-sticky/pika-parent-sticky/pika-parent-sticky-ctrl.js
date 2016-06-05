(function(){

    angular.module('pika-sticky')
        .controller('PikaParentStickyCtrl', ['$element', function($element){

            function getJQelement(){
                return $element;
            }

            this.getJQElement = getJQelement;
        }])

})();
