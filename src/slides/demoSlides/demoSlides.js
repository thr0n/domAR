import {$} from '../../jquery/jquery-common';

import {Slides} from '../Slides';
import {slidePlotly} from './slidePlotly';
import {htmlSlide, HtmlSlide} from '../htmlSlide';
import {createDummySlide} from '../dummySlide';

const width = window.innerWidth;
const height = window.innerHeight;

const createDummySlides = (slides, startIndex, numberOfSlides) => {
    for(let i = startIndex; i < startIndex + numberOfSlides; i++) {
        const id = slides.getAttr(i, "id");
        createDummySlide("#" + id);
    }
}

const createAnimeSlide = (slides, id) => {
    const slideId = slides.getAttr(id, "id");
    htmlSlide(slideId, {
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
}

const createDynamicsSlide = (slides, id) => {
    const slideId = slides.getAttr(id, "id");
    htmlSlide(slideId, {
        pathToHtml: "slides/dynamics/dynamics.html",
    })
}

const createVelocitySlide = (slides, id) => {
    const slideId = slides.getAttr(id, "id");
    const slide = new HtmlSlide(slideId, {
        pathToHtml: "slides/velocity/velocity.html",
        scriptThingyArray: [{
            pathToScript: "slides/velocity/index.js",
            readyFunction: () => {
                return window._velocity_ready;
            }
        }
        ],
        readyFunction: () => {
            return (typeof $('#SVGID_2_ stop').velocity === 'function');
        },
        pathToCssArray: [
            "https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css",
            "slides/velocity/style.css"
        ],
        startFunction: () => {
            window._velocity_start()
        },
        resetFunction: () => {
            window._velocity_reset();
            setTimeout(window._velocity_start, 2000);
        }
    });
    slide.setResetInterval(15000);
}

const createPlotlySlide = (slides, id) => {
    const slideId = slides.getAttr(id, "id");
    slidePlotly(slideId);

}

export const demoSlides = (rootSelector) => {

    const slides = new Slides(rootSelector, width, height);
    const selection = slides.create(10);

    createDummySlides(slides, 0, 4);
    createDynamicsSlide(slides, 4);
    createVelocitySlide(slides, 5);
    createAnimeSlide(slides, 6);
    createPlotlySlide(slides, 7);
    createDummySlides(slides, 8, 2);

    return selection;
}