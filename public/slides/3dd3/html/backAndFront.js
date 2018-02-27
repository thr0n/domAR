/* global slidAR, chartColors, Chart */

(function () {
    var random0To100 = function() {
        return Math.round(Math.random() * 100);
    };

    var polarContext;

    window._backAndFront_polar = function polar() {
        slidAR.canvas.addCanvas("#backAndFront .flipper", 200, 200, "polar");
        polarContext = slidAR.canvas.getContext("#backAndFront .flipper");

        var color = Chart.helpers.color;
        var config = {
            data: {datasets: [{data: [random0To100(), random0To100(), random0To100(), random0To100(), random0To100()],
                    backgroundColor: [
                        color(chartColors.red).alpha(0.5).rgbString(),
                        color(chartColors.orange).alpha(0.5).rgbString(),
                        color(chartColors.yellow).alpha(0.5).rgbString(),
                        color(chartColors.green).alpha(0.5).rgbString(),
                        color(chartColors.blue).alpha(0.5).rgbString(),
                    ], label: 'My dataset'}],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]},
        };

        new Chart(polarContext, config);
    }


})()