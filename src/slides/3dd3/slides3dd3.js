import {Slides} from "../Slides";
import {staticSlide} from "../../staticSlide";
import * as slidesUtil from '../../slidesUtil';
import {slideControl} from '../control/SlideControl';

const width = window.innerWidth;
const height = window.innerHeight;

const SLIDES_FOLDER = "slides/3dd3"

const _title = (slides, slideId) => {
    return staticSlide(slides, slideId, `${SLIDES_FOLDER}/title/index.html`);
}

const _css3d = (slides, slideId) => {
    return staticSlide(slides, slideId, `${SLIDES_FOLDER}/css3d/index.html`);
}

export const init = async (rootSelector, selectedSlideId) => {

    const slides = new Slides(rootSelector, width, height);

    await Promise.all([
        slidesUtil.createSlide(_title, slides, "title", selectedSlideId),
        slidesUtil.createSlide(_css3d, slides, "css3d", selectedSlideId),
    ])

    slideControl.setCurrentSlideId("css3d");

    return slides.selection();
}