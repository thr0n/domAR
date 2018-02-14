import * as tt from 'tooltip';
import * as d3 from 'd3';

export const TOP = "top";
export const BOTTOM = "bottom";
export const RIGHT = "right";
export const LEFT = "left";

export const create = (title, selector, placement) => {
    d3.selectAll(selector)
        .each(function (_dummy, i) {
            new tt.Tooltip(this, {title, placement});
        })
}

export const tooltip = {create, TOP, BOTTOM, RIGHT, LEFT}
