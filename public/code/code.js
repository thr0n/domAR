(function () {

    function init() {
        window.simplAR.initAr();
        window.simplAR.table(3, 1000, 200);
        setTimeout(function () {
            window.simplAR.ring();
        }, 5000)
    }


    window._start = init;

})();
