import {getArPositionRotation} from './arPositions';

const TWEEN = require('@tweenjs/tween.js');

const DEFAULT_DURATION = 1000;

const nextPositionAndRotation = (object) => {
    const type = object._data.getType();
    const totalNum = object._data.getTotalNum();
    const nextIndex = object._data.getNextIndex();
    const {position, rotation} = getArPositionRotation(type, nextIndex, totalNum);

    return {nextIndex, position, rotation}
}

const tween = 0;

export const next = (object) => {
    const {nextIndex, position, rotation} = nextPositionAndRotation(object);

    new TWEEN.Tween(object.position)
        .to({x: position.x, y: position.y, z: position.z}, Math.random() * DEFAULT_DURATION + DEFAULT_DURATION)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

    new TWEEN.Tween(object.rotation)
        .to({x: rotation.x, y: rotation.y, z: rotation.z}, Math.random() * DEFAULT_DURATION + DEFAULT_DURATION)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

    object.setIndex(nextIndex);
}

export const allNext = (allObjects) => {
    allObjects.forEach((object) => {
        next(object);
    })
}
