import {HtmlSlide} from "./htmlSlide";

const SLIDES_FOLDER = "slides/3dd3/html/"

export const staticSlide = (slides, filename) => {
    const pathToHtml = SLIDES_FOLDER + filename + ".html";
    const slideId = filename;
    slides.addOne(slideId);
    const slide = new HtmlSlide(slideId, {pathToHtml});
    return slide.getStartedPromise();
}
