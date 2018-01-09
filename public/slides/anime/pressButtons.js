function pressButtonDelayedAndRecursive(buttons, index) {
    setTimeout(function () {
        buttons.item(index).click();
        pressButtonDelayedAndRecursive(buttons, index < buttons.length-1 ? index+1 : 0);
    }, 5000)
}


var buttons = document.querySelectorAll("button");
pressButtonDelayedAndRecursive(buttons, 1);
