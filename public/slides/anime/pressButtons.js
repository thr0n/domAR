(function () {
    var currentButtons;
    var currentIndex;
    var pauseFlag = false;

    function pressButtonDelayedAndRecursive(buttons, index) {
        currentButtons = buttons;
        currentIndex = index;
        if(pauseFlag) {
            return;
        }

        setTimeout(function () {
            buttons.item(index).click();
            pressButtonDelayedAndRecursive(buttons, index < buttons.length-1 ? index+1 : 0);
        }, 5000)
    }


    var buttons = document.querySelectorAll("button");
    pressButtonDelayedAndRecursive(buttons, 1);

    function pause() {
        pauseFlag = true;
    }

    function resume() {
        pauseFlag = false;
        pressButtonDelayedAndRecursive(currentButtons, currentIndex);
    }

    window._anime_pause = pause;
    window._anime_resume = resume;
})();

