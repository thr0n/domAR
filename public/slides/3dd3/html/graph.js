/* global slidAR */
/* global Chart */
/* global chartColors */
/* global d3 */
/* global $ */
/* global dynamics */

(function () {
    var random0To100 = function() {
        return Math.round(Math.random() * 100);
    };

    var pieContext;
    var donutContext;

    window._graph_pie = function pie() {
        slidAR.canvas.addCanvas("#graphcube .front", 200, 200);
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
        slidAR.canvas.addCanvas("#graphcube .right", 200, 200);
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
        $("#graphcube .front").empty();
    }

    window._graph_clean_donut = function () {
        $("#graphcube .right").empty();
    }

    window._graph_pin = function () {
        var svg = d3.selectAll("#graphcube .top")
            .append("svg")
            .attr("width", 200)
            .attr("height", 200)
            .attr("viewBox", "0 0 200 200")

        var g = svg.append("g")
            .attr("transform", "translate(50,50)")

        g.append("path")
            .attr("d", "M38 106.7c2.4 0 37.7-43 37.8-68.8 0-21-17-38-38-38C17 0 0 17 0 38c.4 27 35.4 68.7 38 68.7z")
            .attr("fill", "#EC1A0A")

        g.append("ellipse")
            .attr("fill", "#FFF")
            .attr("cx", "38.1")
            .attr("cy", "38.1")
            .attr("rx", "23.1")
            .attr("ry", "23.1")

    }

    var paused = false;

    window._graph_pin_animate = function () {
        paused = false;
        var svg = document.querySelector('#graphcube .top svg')
        var div = document.querySelector('#graphcube .top')

        function horizontalBounce() {
            if(!paused) {
                dynamics.animate(div, {
                    rotateZ: -45
                }, {
                    type: dynamics.bounce,
                    duration: 1800,
                    complete: verticalBounce
                })
            }
        }

        function verticalBounce() {
            dynamics.animate(svg, {
                scaleY: 0.8
            }, {
                type: dynamics.bounce,
                duration: 800,
                bounciness: 0
            })

            // Use the delay option to delay your animations
            dynamics.animate(div, {
                translateY: -60
            }, {
                type: dynamics.forceWithGravity,
                bounciness: 0,
                duration: 500,
                delay: 150
            })

            dynamics.animate(svg, {
                scaleY: 0.8
            }, {
                type: dynamics.bounce,
                duration: 800,
                bounciness: 600,
                delay: 650,
                complete: horizontalBounce
            })
        }

        horizontalBounce()
    }

    window._graph_pin_stop_animate = function () {
        paused = true;
    }

    window._graph_clean_pin = function () {
        $("#graphcube .top").empty();
    }
})()

