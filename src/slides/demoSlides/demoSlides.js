import {Slides} from '../Slides';
import {slidePlotly} from './slidePlotly';
import {htmlSlide} from '../htmlSlide';
import {createDummySlide} from '../dummySlide';

const width = window.innerWidth;
const height = window.innerHeight;

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

    const idOfSecondSlide = slides.getAttr(5, "id");
    htmlSlide(idOfSecondSlide, {
        pathToHtml: "slides/anime/anime.html",
        pathToJsArray: [
            "slides/anime/ymlarg.js",
            "slides/anime/index.js",
            "slides/anime/pressButtons.js",
        ],
        pathToCssArray: [
            "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css",
            "slides/anime/ewxggx.css",
            "slides/anime/style.css"
        ]
    });

    createDummySlides(slides, 1, 4);
    createDummySlides(slides, 6, 4);

    return selection;
}