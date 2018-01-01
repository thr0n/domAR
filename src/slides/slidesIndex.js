import {setArPosition, TYPE_RING} from '../arPositions';
import {init} from '../argonApp';
import './slides.css';

import {demoSlides} from './demoSlides/demoSlides';

export const initSlides = (rootSelector) => {
    const {root} = init();
    const selection = demoSlides(rootSelector);
    selection.each(function (d, i) {
        setArPosition(this, root, TYPE_RING, i, selection.size());
    });
}
