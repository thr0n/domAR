import {Slides} from './Slides';
import {setArPosition, TYPE_RING} from './arPositions';
import {init} from './argonApp';

export const initSlides = () => {
    const {root} = init();
    const slides = new Slides();
    const selection = slides.draw();
    selection.each(function (d, i) {
        setArPosition(this, root, TYPE_RING, i, selection.size());
    });
}
