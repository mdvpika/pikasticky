createMultiFunction = function(functions){

    functions = __.asArray(functions);

    function multiFunction(...args){
        for(let i = 0; i < multiFunction.length; ++i){
            multiFunction[i](...args);
        }
    }

    multiFunction.__proto__ = functions;
    
    delete multiFunction.length;

    return multiFunction;
};
