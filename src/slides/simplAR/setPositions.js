import * as d3 from 'd3';

import {getGlobalRoot} from './global';
import {setArPositionRotation} from '../../arPositions';

export const setPosition = (type, pageId, i, totalNum) => {

    d3.selectAll("#" + pageId)
        .each(function() {
            setArPositionRotation(this, getGlobalRoot(), type, i, totalNum);
        })
}

export const setPositions = (type, pageIds) => {
    const totalNum = pageIds.length;
    pageIds.forEach((pageId, i) => {
        setPosition(type, pageId, totalNum);
    })
}