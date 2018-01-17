import * as d3 from 'd3';

export const createDummySlide = (rootSelector) => {
    const root = d3.select(rootSelector);
    const id = root.attr("id");

    root
        .append("div")
        .attr("class", "title dummy")
        .style("width", "100%")
        .style("height", "100%")
        .text(id)
}