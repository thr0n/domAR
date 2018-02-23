import * as d3 from 'd3';

const SLIDE_ELEMENT = "div";
const SLIDE_CLASS = "slide";

export class Slides {

    constructor(rootSelector, width, height) {
        this.rootSelector = rootSelector;
        this.root = d3.selectAll(rootSelector);
        this.width = width;
        this.height = height;
        this.slides = [];
        this.ids = [];
    }

    create(ids) {
        const thisSlides = this;
        this.ids = ids;

        this.selection()
            .data(ids)
            .enter()
            .append(SLIDE_ELEMENT)
            .attr("class", SLIDE_CLASS)
            .attr("id", d => d)
            .style("width", this.width + "px")
            .style("height", this.height + "px")

        this.selection()
            .each(function(d, i) {
                thisSlides.slides[i] = this;
            })

        return this.selection()
    }

    addOne(newId) {
        this.create([...this.ids, newId]);
    }

    getSlide(i) {
        return this.slides[i];
    }

    getAttr(i, attrName) {
        return d3.select(this.getSlide(i))
            .attr(attrName)
    }

    selection() {
        const selector = `${SLIDE_ELEMENT}.${SLIDE_CLASS}`;
        return this.root.selectAll(selector)
    }
}
