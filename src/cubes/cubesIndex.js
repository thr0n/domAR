import {drawCubes} from './drawCubes';
import {setArPositionRotation, TYPE_SPHERE_RANDOM} from '../ar/arPositions';
import {init} from '../ar/argonApp';
import {getTextFunction} from './getText';

export const initCubes = (nameOfTextSet) => {
    const {root} = init();
    const getText = getTextFunction(nameOfTextSet);
    const cubes = drawCubes(getText);
    cubes.each(function (d, i) {
        setArPositionRotation(this, root, TYPE_SPHERE_RANDOM, i)
    });
}