/* global simplAR */

(function () {

    function init() {
        simplAR.initAr();

        const type = simplAR.firstParamSet(["ring", "table", "helix", "sphere", "random"]);
        switch(type) {
            case "ring":
                simplAR.ring();
                break;

            case "helix":
                simplAR.helix();
                break;

            case "sphere":
                simplAR.sphere();
                break;

            case "random":
                simplAR.sphereRandom(100);
                break;

            default:
                simplAR.table(3, 600, 200, 0, 500);
                break;

        }

        const interval = simplAR.paramValue(type) || 2000;

        simplAR.initTween();

        setInterval(function () {
            simplAR.rotate();
        }, interval)
    }

    window._start = init;

})();
