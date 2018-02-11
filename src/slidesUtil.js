import * as _ from "lodash";

export const createSlide = (fct, slides, slideId, selectedSlideId) => {
    if(_.isEmpty(selectedSlideId) ||  slideId == selectedSlideId) {
        return fct(slides, slideId, slideId);
    }
    else {
        return Promise.resolve();
    }
}

