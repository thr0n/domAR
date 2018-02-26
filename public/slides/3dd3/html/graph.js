/* global slidAR */
/* global Chart */
/* global chartColors */

(function () {
    let context;

    var random0To100 = function() {
        return Math.round(Math.random() * 100);
    };

    window._graph_pie = function pie() {
        context = slidAR.canvas.getContext("#graphcube .front");

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

        new Chart(context, config);
    }

    window._graph_donut = function () {
        context = slidAR.canvas.getContext("#graphcube .top");

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

        new Chart(context, config);
    }

    window._graph_clean = function () {
        slidAR.canvas.clearContext(context, 200, 200);
    }
})()

