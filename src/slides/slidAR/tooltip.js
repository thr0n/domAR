import Tooltip from 'tooltip.js';
import * as d3 from 'd3';
import * as _ from 'lodash';

import * as domData from './domData';

export const TOP = "top";
export const BOTTOM = "bottom";
export const RIGHT = "right";
export const LEFT = "left";

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

export const tooltip = {create, remove, TOP, BOTTOM, RIGHT, LEFT}
