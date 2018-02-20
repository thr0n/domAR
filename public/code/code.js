(function () {

    function init() {
        window.simplAR.initAr();
        window.simplAR.table(3, 1000, 200);
        window.simplAR.initTween();

        setTimeout(function () {
            window.simplAR.ring();
        }, 5000)

        setTimeout(function () {
            window.simplAR.sphere();
        }, 10000)
    }


    window._start = init;

})();
