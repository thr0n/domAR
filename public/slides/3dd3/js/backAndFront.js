/* global slidAR, chartColors, Chart */

(function () {
    window._backAndFront_pie = function pie() {
        var canvas = slidAR.canvas.addCanvas("#backAndFront .flipper", 200, 200);
        var context = canvas.getContext('2d');

        context.fillStyle = "blue";
        context.fillRect(0, 0, 200, 200);

        window._charts_pie(context);
    }

    window._backAndFront_clean_pie = function _pie() {
        window._charts_clean("#backAndFront .flipper");
    }
})()