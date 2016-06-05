(function(){
    
    angular.module('pika-angular')
        .directive('pikaClasses', [function(){
            return {
                restrict:'A',
                controller:'PikaClassesCtrl'
            }
        }])
    
})();
