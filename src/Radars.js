import * as d3 from 'd3';
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

const DEMO_ITEMS = [
    {name: "In-vehicle Payments", id: "item0"},
    {name: "Pay as you drive", id: "item1"},
    {name: "Near Field Communication", id: "item2"},
    {name: "Beacons", id: "item3"},
    {name: "Bluetooth Low Energy (BLE, Bluethooth Smart)", id: "item4"},
    {name: "Smart Parking", id: "item5"}
];

const ADD_TO_SVG = 50;

const center = r => r + ADD_TO_SVG/2;

export default class Radars {

    constructor(radius) {
        this.radius = radius;
    }

    _drawItems(root) {
        const gItemData = root.selectAll("g.item").data(d => d.items, d => d.id);

        const gItemEnter = gItemData.enter()
            .append("g")
            .attr("class", d => "item item-" + d.id)
            .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

        gItemData.exit().remove();

        const gItemAll = root.selectAll("g.item");

        gItemAll
            .transition()
            .duration(1000)
            .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

        gItemEnter
            .append("polygon")
            .attr("class", "item")
            .attr("points", "0,0 20,0 10,17");

        gItemEnter
            .append("text")
            .attr("class", "item")
            .attr("x", 25)
            .attr("y", 9);

        gItemAll.selectAll("text").data(d => [d]);

        gItemAll.selectAll("text")
            .text(d => d.name);
    }

    _draw(allRadarsData, radius) {
        const initRings = (rings) => {
            return rings = rings.map((ring, i) => {
                return {...ring, ringNo: i}
            });
        }

        const initSegments = (segments) => {
            const pies = d3.pie()(_.fill(_.range(segments.length), 1));
            return segments.map((segment, i) => {
                return {...segment, no: i, pie: pies[i]};
            });
        };

        const ringData = ({rings, segments}) => {
            return initRings(rings).map((ring, index) => {
                const inner = index * (radius / rings.length);
                const outer = (index+1) * (radius / rings.length);
                return {
                    ring,
                    count: rings.length,
                    arc: d3.arc().outerRadius(outer).innerRadius(inner),
                    segments: initSegments(segments)
                }
            });
        };

        const svgData = d3.selectAll("svg.radar").data(allRadarsData);
        const svgEnter = svgData.enter()
            .append("svg")
            .attr("class", "radar")
            .attr("width", radius*2+ADD_TO_SVG)
            .attr("height", radius*2+ADD_TO_SVG);

        const gRootEnter = svgEnter.append("g")
            .attr("class", "root")
            .attr("transform", "translate(" + (center(radius)) + "," + (center(radius)) + ")");

        gRootEnter.append("circle")
            .attr("class", "background")
            .attr("r", radius + ADD_TO_SVG/2);

        const svgAll = d3.selectAll("svg.radar");
        const gRootAll = svgAll.selectAll("g.root");
        gRootAll.data(d => [d]);


        const gRingData = gRootAll.selectAll("g.ring").data(ringData);
        gRingData.enter()
            .append("g")
            .attr("class", "ring");

        gRingData.exit().remove();

        const gRingAll = svgAll.selectAll("g.ring");

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
                const numberOfRings = this.parentNode.parentNode.__data__.count;
                return (1 / (numberOfRings+1)) * (ringNo+1);
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

        svgAll.selectAll("textPath.legend")
            .attr("xlink:href", d => "#legendarc" + d.no)
            .text(d => d.name);

        gLegendArcData.exit().remove();

        this._drawItems(svgAll);

        return svgAll;
    }

    draw(numberOfRadars) {
        const initItems = (items) => {
            return items.map(item => {
                const deg = Math.random() * 360;
                const dist = Math.random();
                const revertRad = (deg - 180) * (Math.PI / 180);
                const revertX = this.radius * dist * Math.cos(revertRad);
                const revertY = this.radius * dist * Math.sin(revertRad);
                const x = center(this.radius) + revertX;
                const y = center(this.radius) + revertY;
                return {...item, x, y}
            })
        };

        const allRadarsData = _.range(numberOfRadars).map(number => {
            return {
                rings: DEMO_RINGS,
                segments: DEMO_SEGMENTS,
                name: number,
                items: initItems(DEMO_ITEMS)
            }
        });

        return this._draw(allRadarsData, this.radius);
    }
}
