import {Keyboard} from 'keyboardjs';

import {slideControl} from '../control/SlideControl';

const usLocale = require('keyboardjs/locales/us');

const keyboard = new Keyboard();
keyboard.setLocale('us', usLocale);

export const init = () => {
    keyboard.bind('right', () => {
        slideControl.forwardStep();
    })

    keyboard.bind('left', () => {
        slideControl.backwardStep();
    })

}

