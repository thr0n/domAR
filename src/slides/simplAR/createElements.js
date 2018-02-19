import * as d3 from 'd3';

export const createElement = (tagName, parentSelector, id, classes) => {
    const parents = d3.selectAll(parentSelector);
    parents.append(tagName)
        .attr("id", id)
        .attr("class", classes)
}
