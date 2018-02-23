import * as _ from 'lodash';

import {log} from '../util/log';
import {getArPositionRotation, setPositionRotationOnObject} from './arPositions';

const DEFAULT_DURATION = 1000;

const nextPositionAndRotation = (object) => {
    const type = object._data.getType();
    const totalNum = object._data.getTotalNum();
    const nextIndex = object._data.getNextIndex();
    const positionFunction = object._data.getPositionFunction();
    const {position, rotation} = getArPositionRotation(type, nextIndex, totalNum, positionFunction);

    return {nextIndex, position, rotation}
}

export const moveTo = (object, newPosition, newRotation, TWEEN) => {
    if(TWEEN) {
        new TWEEN.Tween(object.position)
            .to({x: newPosition.x, y: newPosition.y, z: newPosition.z}, Math.random() * DEFAULT_DURATION + DEFAULT_DURATION)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({x: newRotation.x, y: newRotation.y, z: newRotation.z}, Math.random() * DEFAULT_DURATION + DEFAULT_DURATION)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(this)
            .to( {}, DEFAULT_DURATION * 2 )
            .start();
    }
    else {
        setPositionRotationOnObject(object, newPosition, newRotation);
    }
}

export const next = (object, TWEEN) => {
    const {nextIndex, position, rotation} = nextPositionAndRotation(object);

    moveTo(object, position, rotation, TWEEN);

    object._data.setIndex(nextIndex);
}

export const allNext = (allObjects, TWEEN) => {
    allObjects.forEach((object) => {
        next(object, TWEEN);
    })
}
