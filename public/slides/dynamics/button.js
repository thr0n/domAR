/* global dynamics */

(function () {
    var el = document.querySelector('path')
    var textEl = document.querySelector('span')
    var pathOver = el.getAttribute('data-over-path')
    var pathOut = el.getAttribute('d')

// Over animation
    function animateOver() {
        dynamics.animate(el, {
            d: pathOver,
            fill: "#007EFF"
        }, {
            type: dynamics.spring,
            complete: animateOut
        })

        dynamics.animate(textEl, {
            scale: 1.06
        }, {
            type: dynamics.spring
        })
    }

// Out animation
    function animateOut() {
        dynamics.animate(el, {
            d: pathOut,
            fill: "#0bf"
        }, {
            type: dynamics.easeInOut,
            friction: 100
        })

        dynamics.animate(textEl, {
            scale: 1
        }, {
            type: dynamics.easeInOut,
            friction: 100,
            complete: function() {
                dynamics.setTimeout(animateOver, 500)
            }
        })
    }

// Start
    animateOver()
})();
