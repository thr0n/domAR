/* global dynamics */

(function () {
    var el = document.querySelector('#triangle')

// From purple to green
    function animate1() {
        dynamics.animate(el, {
            rotateZ: 180,
            scale: 1.5,
            borderBottomColor: '#43F086'
        }, {
            type: dynamics.spring,
            friction: 400,
            duration: 1300,
            complete: animate2
        })
    }

// From green to purple
    function animate2() {
        dynamics.animate(el, {
            rotateZ: 360,
            scale: 1,
            borderBottomColor: '#CA2F6F'
        }, {
            type: dynamics.spring,
            frequency: 600,
            friction: 400,
            duration: 1800,
            anticipationSize: 350,
            anticipationStrength: 400,
            complete: animate1
        })
    }

// Start first animation
    animate1()
})();

