(function () {
    const pauseFunctions = [];
    const resumeFunctions = [];

    function addPauseFunction(fct) {
        pauseFunctions.push(fct);
    }

    function addResumeFunction(fct) {
        resumeFunctions.push(fct);
    }

    function doPause() {
        window._dynamics_spinner_pause();
        window._dynamics_basics_pause();
        window._dynamics_button_pause();
        window._dynamics_pin_pause();
        window._dynamics_dots_pause();
    }

    function doResume() {
        window._dynamics_spinner_resume();
        window._dynamics_basics_resume();
        window._dynamics_button_resume();
        window._dynamics_pin_resume();
        window._dynamics_dots_resume();
    }

    window._dynamics_add_pause_function = addPauseFunction;
    window._dynamics_add_resume_function = addResumeFunction;
    window._dynamics_pause = doPause;
    window._dynamics_resume = doResume;
})();
