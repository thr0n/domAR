import {Slides} from '../Slides';
import {slidePlotly} from './slidePlotly';
import {createDummySlide} from '../dummySlide';

const width = window.innerWidth / 3;
const height = window.innerHeight / 3;

const createDummySlides = (slides, startIndex, numberOfSlides) => {
    for(let i = startIndex; i < startIndex + numberOfSlides; i++) {
        const id = slides.getAttr(i, "id");
        createDummySlide("#" + id);
    }
}

export const demoSlides = (rootSelector) => {

    const slides = new Slides(rootSelector, width, height);
    const selection = slides.create(10);

    const idOfFirstSlide = slides.getAttr(0, "id");
    slidePlotly(idOfFirstSlide);
    createDummySlides(slides, 1, 9);

    return selection;
}