/* global slidAR */
/* global Chart */
/* global chartColors */

(function () {
    var random0To100 = function() {
        return Math.round(Math.random() * 100);
    };

    var pieContext;
    var donutContext;

    window._graph_pie = function pie() {
        pieContext = slidAR.canvas.getContext("#graphcube .front");

        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [random0To100(), random0To100(), random0To100(), random0To100(), random0To100()],
                    backgroundColor: [chartColors.red, chartColors.orange, chartColors.yellow, chartColors.green, chartColors.blue],
                    label: 'Dataset 1'
                }],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"
                ]
            },
            options: {
                responsive: true
            }
        };

        new Chart(pieContext, config);
    }

    window._graph_donut = function () {
        donutContext = slidAR.canvas.getContext("#graphcube .right");

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [random0To100(), random0To100(), random0To100(), random0To100(), random0To100()],
                    backgroundColor: [chartColors.red, chartColors.orange, chartColors.yellow, chartColors.green, chartColors.blue],
                    label: 'Dataset 1'
                }],
                labels: ["Red", "Orange", "Yellow", "Green", "Blue"]
            },
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Doughnut Chart'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };

        new Chart(donutContext, config);
    }

    window._graph_clean_pie = function () {
        slidAR.canvas.clearContext(pieContext, 200, 200);
    }

    window._graph_clean_donut = function () {
        slidAR.canvas.clearContext(donutContext, 200, 200);
    }
})()

