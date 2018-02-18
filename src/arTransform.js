import {log} from './util/log';
import {getArPositionRotation, setPositionRotationOnObject} from './arPositions';

const DEFAULT_DURATION = 1000;

const nextPositionAndRotation = (object) => {
    const type = object._data.getType();
    const totalNum = object._data.getTotalNum();
    const nextIndex = object._data.getNextIndex();
    const {position, rotation} = getArPositionRotation(type, nextIndex, totalNum);

    return {nextIndex, position, rotation}
}

export const next = (object, TWEEN) => {
    const {nextIndex, position, rotation} = nextPositionAndRotation(object);

    log.info("start tween: " + object._data.getIndex());

    if(TWEEN) {
        new TWEEN.Tween(object.position)
            .to({x: position.x, y: position.y, z: position.z}, Math.random() * DEFAULT_DURATION + DEFAULT_DURATION)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onUpdate(() => log.info("position: " + object.position))
            .start();

        new TWEEN.Tween(object.rotation)
            .to({x: rotation.x, y: rotation.y, z: rotation.z}, Math.random() * DEFAULT_DURATION + DEFAULT_DURATION)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onUpdate(() => log.info("rotation: " + object.rotation))
            .start();

        new TWEEN.Tween(this)
            .to( {}, DEFAULT_DURATION * 2 )
            .start();
    }
    else {
        setPositionRotationOnObject(object, position, rotation);
    }

    object._data.setIndex(nextIndex);
}

export const allNext = (allObjects, TWEEN) => {
    allObjects.forEach((object) => {
        next(object, TWEEN);
    })
}
