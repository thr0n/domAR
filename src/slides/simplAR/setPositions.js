import * as d3 from 'd3';

import {getGlobalRoot} from './global';
import {setArPositionRotation, TYPE_HELIX, TYPE_RING, TYPE_SPHERE, TYPE_SPHERE_RANDOM} from '../../arPositions';

export const setPosition = (type, pageId, i, totalNum) => {

    d3.selectAll("#" + pageId)
        .each(function() {
            setArPositionRotation(this, getGlobalRoot(), type, i, totalNum);
        })
}

export const setPositions = (type, pageIds) => {
    const totalNum = pageIds.length;
    pageIds.forEach((pageId, i) => {
        setPosition(type, pageId, i, totalNum);
    })
}

const getIdArray = () => {
    return window._pages.map((page) => page.id);
}

export const ring = () => {
    setPositions(TYPE_RING, getIdArray());
}

export const sphere = () => {
    setPositions(TYPE_SPHERE, getIdArray());
}
