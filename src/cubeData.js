import {UPPER_LEFT, UPPER_RIGHT, LOWER_LEFT, LOWER_RIGHT} from './places';

export const WIDTH = window.innerWidth;
export const HEIGHT = window.innerHeight;
export const SIDE_LENGTH = Math.min(WIDTH, HEIGHT) / 4;

export const UPPER = HEIGHT / 4 - SIDE_LENGTH / 2;
export const LOWER = HEIGHT * (3 / 4) - SIDE_LENGTH / 2;
export const LEFT = WIDTH / 4 - SIDE_LENGTH / 2;
export const RIGHT = WIDTH * (3 / 4) - SIDE_LENGTH / 2;

export const cubeData = [
    {
        id: UPPER_LEFT,
        x: LEFT,
        y: UPPER,
        z: 0,
        width: SIDE_LENGTH,
        height: SIDE_LENGTH
    },
    {
        id: UPPER_RIGHT,
        x: RIGHT,
        y: UPPER,
        z: 0,
        width: SIDE_LENGTH,
        height: SIDE_LENGTH
    },
    {
        id: LOWER_RIGHT,
        x: RIGHT,
        y: LOWER,
        z: 0,
        width: SIDE_LENGTH,
        height: SIDE_LENGTH
    },
    {
        id: LOWER_LEFT,
        x: LEFT,
        y: LOWER,
        z: 0,
        width: SIDE_LENGTH,
        height: SIDE_LENGTH
    },
]

