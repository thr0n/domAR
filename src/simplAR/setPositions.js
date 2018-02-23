import * as d3 from 'd3';
import * as _ from 'lodash';

import {getGlobalRoot, getTween} from './global';
import {setArPositionRotation, getArPositionRotation, TYPE_HELIX, TYPE_RING, TYPE_SPHERE, TYPE_SPHERE_RANDOM, TYPE_TABLE, randomSphereInit, tableInit} from '../ar/arPositions';
import {moveTo, next} from '../ar/arTransform';

export const setPosition = (type, pageId, i, totalNum, positionFunction) => {
    d3.selectAll("#" + pageId)
        .each(function(d) {
            const object = setArPositionRotation(this, getGlobalRoot(), type, i, totalNum, positionFunction);
            d.object = object;
        })
}

export const moveToPosition = (type, pageId, i, totalNum, positionFunction) => {
    d3.selectAll("#" + pageId)
        .each(function(d) {
            const {position, rotation} = getArPositionRotation(type, i, totalNum, positionFunction);
            moveTo(d.object, position, rotation, getTween());
        })
}

const nextPosition = (pageId) => {
    d3.selectAll("#" + pageId)
        .each(function(d) {
            next(d.object, getTween());
        })
}

let currentType;

export const setPositions = (type, pageIds, positionFunction) => {
    const totalNum = pageIds.length;
    pageIds.forEach((pageId, i) => {
        if(_.isUndefined(currentType)) {
            setPosition(type, pageId, i, totalNum, positionFunction);
        }
        else {
            moveToPosition(type, pageId, i, totalNum, positionFunction);
        }
    })
    currentType = type;
}

const getIdArray = () => {
    return window._pages.map((page) => page.id);
}

export const rotate = () => {
    const pageIds = getIdArray();
    pageIds.forEach((pageId) => {
        nextPosition(pageId);
    })
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
