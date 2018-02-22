import {slideControl} from '../control/SlideControl';

export const set = (slideId, steps) => {
    slideControl.setStepsObject(slideId, steps);
}

export const steps = {
    set
}
