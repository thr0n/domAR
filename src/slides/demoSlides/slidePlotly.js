import * as d3 from 'd3';
import {PlotlyDemo} from '../../plotly/plotly-demo';

export const slidePlotly = (slideId) => {
    const root = d3.select("#" + slideId);
    const plotlyDemo = new PlotlyDemo(slideId);
    plotlyDemo.startDemo();

    root
        .append("div")
        .attr("class", "title")
        .style("color", "black")
        .style("z-index", 1000)
        .text("plotly.js")

    return plotlyDemo;
}
