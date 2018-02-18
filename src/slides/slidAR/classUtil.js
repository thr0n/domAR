import * as d3 from 'd3';

export const setRemoveClass = (selector, className, trueToSet, intervalInMs) => {
    d3.selectAll(selector)
        .each(function(_, i) {
            const element = this;
            setTimeout(function () {
                d3.select(element).classed("xaxis", trueToSet)
            }, i * (intervalInMs || 0))
        })
}

export const setClass = (selector, className, intervalInMs) => {
    setRemoveClass(selector, className, true, intervalInMs);
}

export const removeClass = (selector, className, intervalInMs) => {
    setRemoveClass(selector, className, false, intervalInMs);
}

export const classUtil = {setRemoveClass, setClass, removeClass};
