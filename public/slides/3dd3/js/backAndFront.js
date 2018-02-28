/* global slidAR, chartColors, Chart, d3 */

(function () {
    window._backAndFront_pie = function pie() {
        var canvas = slidAR.canvas.addCanvas("#backAndFront .flipper", 200, 200, "one");
        var context = canvas.getContext('2d');

        window._charts_pie(context);
    }

    window._backAndFront_box = function () {
        var svg = d3.selectAll("#backAndFront .flipper")
            .append("svg")
            .attr("class", "background two")
            .attr("width", 200)
            .attr("height", 200)
            .attr("viewBox", "0 0 200 200")
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 200)
            .attr("height", 200)
            .attr("fill", "grey")
    }

    window._backAndFront_clean_pie = function _pie() {
        window._charts_clean("#backAndFront .flipper");
    }
})()