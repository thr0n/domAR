import * as d3 from 'd3';
import * as _ from 'lodash';

const SLIDE_ELEMENT = "div";
const SLIDE_CLASS = "slide";

export class Slides {

    constructor(rootSelector, width, height) {
        this.root = d3.select(rootSelector);
        this.width = width;
        this.height = height;
        this.slides = [];
    }

    create(num) {
        const that = this;

        this.selection()
            .data(_.range(num))
            .enter()
            .append(SLIDE_ELEMENT)
            .attr("class", SLIDE_CLASS)
            .attr("id", d => "slide-" + d)
            .style("width", this.width + "px")
            .style("height", this.height + "px");

        this.selection()
            .each((d, i) => {
                that.slides[i] = this;
            })

        return this.selection()
    }

    getSlide(i) {
        return this.slides[i];
    }

    getId(i) {
        return d3.select(this.getSlide(i))
            .attr("id")
    }

    selection() {
        return this.root.selectAll(`${SLIDE_ELEMENT}.${SLIDE_CLASS}`)
    }
}
