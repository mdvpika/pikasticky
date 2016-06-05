(function(){
    angular.module('jquery-extension-angularizer',[])
        .run(['pikaAngularJQueryExtensionRunnerService', function(pikaAngularJQueryExtensionRunnerService){
            pikaAngularJQueryExtensionRunnerService(['relocate']);
        }])
})();
