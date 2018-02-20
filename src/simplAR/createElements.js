import * as d3 from 'd3';

export const createElement = (tagName, parentSelector, id, classes) => {
    const parent = d3.select(parentSelector);
    parent.selectAll(tagName + "#" + id)
        .data([{id, classes}])
        .enter()
        .append(tagName)
        .attr("id", d => d.id)
        .attr("class", d => d.classes)
}
