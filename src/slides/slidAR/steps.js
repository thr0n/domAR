import {slideControl} from './SlideControl';

export const set = (steps) => {
    slideControl.setStepsForCurrentSlide(steps);
}

export const steps = {
    set
}
