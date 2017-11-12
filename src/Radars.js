import * as d3 from 'd3'
import * as _ from 'lodash';

const DEMO_SEGMENTS = [
    {name: "Technologie", id: "segment0"},
    {name: "Produktinnovation", id: "segment1"},
    {name: "Prozessinnovation", id: "segment2"},
    {name: "Geschäftsmodellinnovation", id: "segment3"},
    {name: "Trend", id: "segment4"},
    {name: "Sonstiges", id: "segment5"}
];

const DEMO_RINGS = [
    {name: "State of the art", id: "ring0"},
    {name: "Marktreife", id: "ring1"},
    {name: "Verprobung", id: "ring2"},
    {name: "Entwicklung", id: "ring3"},
    {name: "Forschung", id: "ring4"}
];

export default class Radars {

    constructor(radius) {
        this.radius = radius;
    }

    _draw(allRadarsData, radius) {
        const ringData = ({rings, segments}) => {
            return rings.map((ring, index) => {
                const inner = index * (radius / rings.length);
                const outer = (index+1) * (radius / rings.length);
                return {
                    ring,
                    arc: d3.arc().outerRadius(outer).innerRadius(inner),
                    segments: segments
                }
            });
        };

        const svgData = d3.selectAll("svg.radar").data(allRadarsData);
        svgData.enter()
            .append("svg")
            .attr("class", "radar")
            .attr("width", radius*2)
            .attr("height", radius*2);

        const svgAll = d3.selectAll("svg.radar");

        const gRingData = svgAll.selectAll("g.ring").data(ringData);
        gRingData.enter()
            .append("g")
            .attr("class", "ring");

        gRingData.exit().remove();

        const gRingAll = gRadar.selectAll("g.ring");

        const gArcData = gRingAll.selectAll("g.arc")
            .data(d => d.segments, d => d.id);

        const gArcEnter = gArcData.enter()
            .append("g")
            .attr("class", "arc");

        gArcEnter.append("path")
            .attr("class", "arc");

        const gArcAll = gRingAll.selectAll("g.arc");
        gArcAll.selectAll("path.arc").data(d => [d]);

        gArcAll.selectAll("path.arc")
            .attr("class", function(d) {
                const ringId = this.parentNode.parentNode.__data__.ring.id;
                return "arc arc-" + d.id + " arc-" + ringId;
            })
            .style("fill", "#3732F5")
            .transition()
            .duration(1000)
            .attr("d", function (d) {
                const arc = this.parentNode.parentNode.__data__.arc;
                return arc(d.pie);
            })
            .style("opacity", function (d, i) {
                const ringNo = this.parentNode.parentNode.__data__.ring.ringNo;
                return (1 / (rings.length+1)) * (ringNo+1);
            });

        gArcData.exit().remove();

        const gLegendArcData = gRingAll.selectAll("g.legendarc")
            .data(d => d.segments, d => d.id);

        const gLegendArcEnter = gLegendArcData.enter()
            .append("g")
            .attr("class", "legendarc");

        gLegendArcEnter.append("path")
            .attr("class", "legendarc")
            .style("fill", "none")
            .style("opacity", "0");

        const gLegendArcAll = gRingAll.selectAll("g.legendarc");
        gLegendArcAll.selectAll("path.legendarc").data(d => [d]);
        gLegendArcAll.selectAll("text").data(d => [d]);
        gLegendArcAll.selectAll("text").selectAll("textPath.legend").data(d => [d]);

        gLegendArcAll.selectAll("path.legendarc")
            .attr("d", d => {
                const arc = d3.arc().outerRadius(radius + 10).innerRadius(radius + 10);
                return arc(d.pie)
            })
            .attr("id", d => "legendarc" + d.no);

        gLegendArcEnter.append("text")
            .append("textPath")
            .attr("class", "legend")
            .style("text-anchor","middle") //place the text halfway on the arc
            .attr("startOffset", "20%");

        gRadar.selectAll("textPath.legend")
            .attr("xlink:href", d => "#legendarc" + d.no)
            .text(d => d.name);

        gLegendArcData.exit().remove();

        return svgData;
    }

    draw(numberOfRadars) {
        const allRadarsData = _.range(numberOfRadars).map(number => {
            return {rings: DEMO_RINGS, segments: DEMO_SEGMENTS, name: num}
        });
        return this._draw(allRadarsData, this.radius);
    }
}
