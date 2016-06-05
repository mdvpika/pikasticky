let Loop = (function () {
    function Loop(iterFn, loopBodies) {

        let started = false;
        loopBodies = loopBodies || [];
        loopBodies = __.asArray(loopBodies);
        loopBodies = createMultiFunction(loopBodies);
        
        function innerLoop() {
            iterFn(() => {
                if (started) {
                    loopBodies();
                    innerLoop();
                }
            });
        }

        function add(loopBody) {
            loopBodies.push(loopBody);
            if (loopBodies.length === 1) {
                start();
            }
        }

        function remove(loopBody) {
            __.remove(loopBodies, loopBody);
            if (loopBodies.length === 0) {
                stop();
            }
        }

        function stop() {
            started = false;
        }

        function start() {
            started = true;
            innerLoop();
        }

        this.add = add;
        this.remove = remove;
    }

    return Loop;
})();