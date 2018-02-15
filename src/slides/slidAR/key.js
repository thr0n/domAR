import {Keyboard} from 'keyboardjs';

import {slideControl} from '../control/SlideControl';

const keyboard = new Keyboard();

keyboard.bind('left', () => {
    slideControl.forwardStep();
})
