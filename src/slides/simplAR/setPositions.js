import * as d3 from 'd3';

import {getGlobalRoot} from './global';
import {setArPositionRotation, TYPE_HELIX, TYPE_RING, TYPE_SPHERE, TYPE_SPHERE_RANDOM, TYPE_TABLE, randomSphereInit, tableInit} from '../../arPositions';

export const setPosition = (type, pageId, i, totalNum, positionFunction) => {

    d3.selectAll("#" + pageId)
        .each(function() {
            setArPositionRotation(this, getGlobalRoot(), type, i, totalNum, positionFunction);
        })
}

export const setPositions = (type, pageIds, positionFunction) => {
    const totalNum = pageIds.length;
    pageIds.forEach((pageId, i) => {
        setPosition(type, pageId, i, totalNum, positionFunction);
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

export const helix = () => {
    setPositions(TYPE_HELIX, getIdArray());
}

export const sphereRandom = (numberOfSlots) => {
    const positionFunction = randomSphereInit(numberOfSlots);
    setPositions(TYPE_SPHERE_RANDOM, getIdArray(), positionFunction);
}

export const table = (numberOfColumns, cellWidth, cellHeight, xOffset, yOffset, zOffset) => {
    const positionFunction = tableInit(numberOfColumns, cellWidth, cellHeight, xOffset, yOffset, zOffset);
    setPositions(TYPE_TABLE, getIdArray(), positionFunction);
}
