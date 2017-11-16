import * as d3 from 'd3';

import {nextDirection, BOTTOM, BACK, TOP, FRONT, LEFT, RIGHT, AXIS_X, AXIS_Y} from './direction';
import {cubeData} from './cubeData';

const START_Y_ROTATION = 10;
const START_X_ROTATION = -10;

const initialDirections = [FRONT, BACK, RIGHT, LEFT, TOP, BOTTOM];

const drawSvgBars = () => {

    const selection = d3.selectAll("div.container")
        .data(cubeData, d => d.id);

    const enterContainer = selection.enter()
        .append("div")
        .attr("class", d => "container _" + d.id)

    enterContainer.merge(selection)
        .style("transform", d => "translateX(" + d.x + "px) translateY(" + d.y + "px) translateZ(" + d.z + "px) ")

    const rotation = (degX, degY) => "rotateX(" + degX + "deg) rotateY(" + degY + "deg)"

    const enterCube = enterContainer
        .append("div")
        .attr("class", d => "cube _" + d.id)
        .style("transform-origin", d => (d.width/2) + "px " + (d.height/2) + "px")
        .style("transform", rotation(START_X_ROTATION, START_Y_ROTATION))

    const rotate = (id, axis) => {
        const divs = enterContainer.selectAll("div.cube._" + id)
            .transition()
            .duration(1000)
            .styleTween("transform", d => {
                if(axis === AXIS_X) {
                    d.rotationX = isNaN(d.rotationX) ? START_X_ROTATION - 90 : d.rotationX-90;
                    d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION : d.rotationY;
                    return d3.interpolate(rotation(d.rotationX+90, d.rotationY), rotation(d.rotationX, d.rotationY));
                }
                else if(axis === AXIS_Y){
                    d.rotationX = isNaN(d.rotationX) ? START_X_ROTATION : d.rotationX;
                    d.rotationY = isNaN(d.rotationY) ? START_Y_ROTATION + 90 : d.rotationY+90;
                    return d3.interpolate(rotation(d.rotationX, d.rotationY-90), rotation(d.rotationX, d.rotationY));
                }
            })

        divs.selectAll("svg.part")
            .each(d => {
                d.currentDirection = nextDirection(d.currentDirection, axis);
            })
    }

    const isTopBottom = d => d.initialDirection === "top" || d.initialDirection === "bottom";
    const height = d => isTopBottom(d) ? d.width : d.height;
    const width = d => d.width;

    const selection = enterCube.selectAll("svg")
        .data(d => {
            return initialDirections.map(direction => {
                return {...d, initialDirection: direction, currentDirection: direction}
            })
        })

    selection.enter()
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
