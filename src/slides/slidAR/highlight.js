import './highlight.css';

import * as d3 from 'd3';

const HIGHLIGHT_CLASS = "_highlight_";
const BORDER_CLASS = "border";
const LIGHT_CLASS = "light";

const setClass = (selector, className) => {
    d3.selectAll(selector).classed(className, true);
}

export const lightBorder = (selector) => {
    setClass(selector, HIGHLIGHT_CLASS);
    setClass(selector, BORDER_CLASS);
    setClass(selector, LIGHT_CLASS);
}

export const highlight = {lightBorder};
