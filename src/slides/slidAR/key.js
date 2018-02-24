import {Keyboard} from 'keyboardjs';

import {slideControl} from '../control/SlideControl';
import {executeCommand, COMMAND_BACK, COMMAND_FWD, COMMAND_NEXT, COMMAND_PREV} from '../control/commandExecutor';

const usLocale = require('keyboardjs/locales/us');

const keyboard = new Keyboard();
keyboard.setLocale('us', usLocale);

export const init = () => {
    keyboard.bind('right', () => {
        executeCommand(COMMAND_FWD);
    })

    keyboard.bind('left', () => {
        executeCommand(COMMAND_BACK)
    })

    keyboard.bind('up', () => {
        executeCommand(COMMAND_NEXT)
    })

    keyboard.bind('down', () => {
        executeCommand(COMMAND_PREV)
    })

}

