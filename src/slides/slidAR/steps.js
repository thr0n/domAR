import {slideControl} from '../control/SlideControl';

export const set = (steps) => {
    slideControl.setStepsForCurrentSlide(steps);
}

export const steps = {
    set
}
