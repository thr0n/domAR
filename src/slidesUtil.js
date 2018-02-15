import * as _ from "lodash";
import {slideControl} from './slides/control/SlideControl';

export const createSlide = (fct, slides, slideId, selectedSlideId) => {
    if(_.isEmpty(selectedSlideId) ||  slideId === selectedSlideId) {
        slideControl.setCurrentSlideId(slideId);
        return fct(slides, slideId, slideId);
    }
    else {
        return Promise.resolve();
    }
}

