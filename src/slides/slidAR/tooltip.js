import Tooltip from 'tooltip.js';
import * as d3 from 'd3';
import * as _ from 'lodash';

import * as domData from './domData';
import {slideControl} from '../control/SlideControl';

export const TOP = "top";
export const BOTTOM = "bottom";
export const RIGHT = "right";
export const LEFT = "left";

const $ = window.$;

const tooltipAttribute = (attributeName) => {
    return "tooltip-" + attributeName;
}

export const create = (title, selector, placement) => {
    d3.selectAll(selector)
        .each(function (_dummy, i) {
            const instance = new Tooltip(this, {title, placement});
            domData.addAttributeToDomElement(this, tooltipAttribute(placement), instance);
            instance.show();
        })
}

export const remove = (selector, placement) => {
    d3.selectAll(selector)
        .each(function (_dummy, i) {
            const instance = domData.getAttributeFromDomElement(this, tooltipAttribute(placement));
            if(!_.isEmpty(instance)) {
                instance.dispose();
            }
        })
}

export const createPt = (title, selector, position) => {
    const currentSlideId = slideControl.getCurrentSlideId();
    $(selector).protipShow({
        title,
        position,
        target: true,
        size: 'big'
    })
}

export const removePt = (selector) => {
    $(selector).protipHide();
}

export const tooltip = {createPt, removePt, create, remove, TOP, BOTTOM, RIGHT, LEFT}
