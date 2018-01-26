import {setArPositionRotation, TYPE_RING} from '../arPositions';
import {init} from '../argonApp';
import './slides.css';
import {CommandHub} from './control/commandHub';

import {demoSlides} from './demoSlides/demoSlides';

export const initSlides = (rootSelector) => {
    new CommandHub();

    const {root} = init();
    const selection = demoSlides(rootSelector);
    selection.each(function (d, i) {
        setArPositionRotation(this, root, TYPE_RING, i, selection.size());
    });
}
