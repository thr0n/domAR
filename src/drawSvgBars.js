import * as d3 from 'd3';
import * as _ from 'lodash';

import {nextDirection, BOTTOM, BACK, TOP, FRONT, LEFT, RIGHT, AXIS_X, AXIS_Y} from './direction';
import {cubeData} from './cubeData';
import DrawText from './DrawText';
import getText from './getText';

const START_Y_ROTATION = 10;
const START_X_ROTATION = -10;

const START_PATH = "M 10, 10 m -7.5, 0 a 7.5,7.5 0 1,0 15,0 a 7.5,7.5 0 1,0 -15,0";

const initialDirections = [FRONT, BACK, RIGHT, LEFT, TOP, BOTTOM];

const drawSvgBars = () => {

    const divSelection = d3.selectAll("div.container")
        .data(cubeData, d => d.id);

    const enterContainer = divSelection.enter()
        .append("div")
        .attr("class", d => "container _" + d.id)

    enterContainer.merge(divSelection)
        .style("transform", d => "translateX(" + d.x + "px) translateY(" + d.y + "px) translateZ(" + d.z + "px) ")

    const rotation = (degX, degY) => "rotateX(" + degX + "deg) rotateY(" + degY + "deg)"

    const enterCube = enterContainer
        .append("div")
        .attr("class", d => "cube _" + d.id + " spinning" + (_.random(1, 3)))
        .style("transform-origin", d => (d.width/2) + "px " + (d.height/2) + "px")
        .style("transform", rotation(START_X_ROTATION, START_Y_ROTATION))

    const isTopBottom = d => d.initialDirection === "top" || d.initialDirection === "bottom";
    const height = d => isTopBottom(d) ? d.width : d.height;
    const width = d => d.width;

    const svgSelection = enterCube.selectAll("svg")
        .data(d => {
            return initialDirections.map(direction => {
                return {...d, initialDirection: direction, currentDirection: direction}
            })
        })

    const enterSvg = svgSelection.enter()
        .append("svg")
        .attr("class", d => "part " + d.initialDirection)
        .attr("height", height)
        .attr("width", width)
        .style("position", "absolute")
        .style("transform", d => {
            if(isTopBottom(d)) {
                const y = d.height/2 - d.width/2;
                return "translateY(" + y + "px)";
            }
        })

    const sideG = enterSvg.append("g")
        .attr("transform", d => "translate(" + (width(d)/2) + "," + (height(d)/2) + ")")

    const fromId = d => d.id + "-" + d.initialDirection + "-from";
    const toId = d => d.id + "-" + d.initialDirection + "-to";

    sideG.append("path")
        .attr("class", d => d.id + " " + d.initialDirection + " from")
        .attr("id", fromId)
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", START_PATH)

    sideG.append("path")
        .attr("class", d => d.id + " " + d.initialDirection + " to")
        .attr("id", toId)
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", START_PATH)
        .style("visibility", "hidden")

    sideG.each(d => {
        const text = getText(d.id).next().value;
        (new DrawText(sideG, "#" + fromId(d), "#" + toId(d), text)).start();
    })

    enterContainer.selectAll("svg." + FRONT)
        .style("transform", d => "translateZ(" + (d.width/2) + "px)")

    enterContainer.selectAll("svg." + BACK)
        .style("transform", d => "rotateY(-180deg) translateZ(" + (d.width/2) + "px)")

    enterContainer.selectAll("svg." + RIGHT)
        .style("transform", d => "rotateY(90deg) translateZ(" + (d.width/2) + "px)")

    enterContainer.selectAll("svg." + LEFT)
        .style("transform", d => "rotateY(-90deg) translateZ(" + (d.width/2) + "px)")

    enterContainer.selectAll("svg." + TOP)
        .style("transform", d => "translateY(" + (d.height/2 - d.width/2) + "px) rotateX(90deg) translateZ(" + (d.height/2) + "px)")

    enterContainer.selectAll("svg." + BOTTOM)
        .style("transform", d =>  "translateY(" + (d.height/2 - d.width/2) + "px) rotateX(-90deg) translateZ(" + (d.height/2) + "px)")

    return enterContainer
};

export default drawSvgBars;
