import './highlight.css';

import * as d3 from 'd3';

const HIGHLIGHT_CLASS = "_highlight_";
const BORDER_CLASS = "border";
const LIGHT_COLOR_CLASS = "light";
const DARK_COLOR_CLASS = "dark";
const ON_CLASS = "on";
const OFF_CLASS = "off";

const setClass = (selector, className) => {
    d3.selectAll(selector).classed(className, true);
}

export const border = (selector, borderColorClass) => {
    setClass(selector, HIGHLIGHT_CLASS);
    setClass(selector, BORDER_CLASS);
    setClass(selector, borderColorClass);
}

export const lightBorder = (selector) => {
    border(selector, LIGHT_COLOR_CLASS)
}

export const darkBorder = (selector) => {
    border(selector, DARK_COLOR_CLASS);
}

export const animatedBorder = (selector, borderColorClass) => {
    setClass(selector, OFF_CLASS);
    border(selector, borderColorClass);
    setTimeout(() => {
        setClass(selector, ON_CLASS);
    })
}

export const highlight = {lightBorder, darkBorder, animatedBorder, LIGHT_COLOR_CLASS, DARK_COLOR_CLASS};
