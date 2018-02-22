import {Slides} from "../Slides";
import {staticSlide} from "../staticSlide";
import * as slidesUtil from '../slidesUtil';
import {slideControl} from '../control/SlideControl';

const width = window.innerWidth;
const height = window.innerHeight;

export const init = async (rootSelector, selectedFilename) => {

    const slides = new Slides(rootSelector, width, height);

    const createFct = (filename) => staticSlide(slides, filename);

    await Promise.all([
        slidesUtil.createSlide(createFct, "css3d", selectedFilename),
        slidesUtil.createSlide(createFct, "title", selectedFilename),
    ])

    slideControl.setCurrentSlideId("title.html");

    return slides.selection();
}