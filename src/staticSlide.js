import {HtmlSlide} from "./slides/htmlSlide";

export const staticSlide = (slides, slideId, pathToHtml) => {
    slides.addOne(slideId);
    const slide = new HtmlSlide(slideId, {pathToHtml});
    return slide.getStartedPromise();
}
