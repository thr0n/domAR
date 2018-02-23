import * as _ from 'lodash';
import {THREE} from './threeHelper';

import {ObjectData} from './ObjectData';

export const TYPE_HELIX = "helix";
export const TYPE_SPHERE = "sphere";
export const TYPE_SPHERE_RANDOM = "sphere-random";
export const TYPE_RING = "ring";
export const TYPE_TABLE = "table";

export const DEFAULT_NUMBER_OF_POSSIBLE_PLACES = 50;
export const DEFAULT_NUMBER_PF_TABLE_COLUMNS = 30;

export const randomSphereInit = (numberOfPossiblePlaces) => {
    const shuffledPlaces = _.shuffle(_.range(0, numberOfPossiblePlaces-1));

    return (i) => {
        const phi = Math.acos(-1 + 2 * shuffledPlaces[i] / numberOfPossiblePlaces);
        const theta = Math.sqrt((numberOfPossiblePlaces - 1) * Math.PI) * phi;

        const random = new THREE.Object3D();
        random.position.x = 800 * Math.cos(theta) * Math.sin(phi);
        random.position.y = 800 * Math.sin(theta) * Math.sin(phi);
        random.position.z = 800 * Math.cos(phi);

        const vector = new THREE.Vector3();
        vector.copy(random.position).multiplyScalar(-2);
        random.lookAt(vector);

        return random;
    }
};

export const randomSphere = randomSphereInit(DEFAULT_NUMBER_OF_POSSIBLE_PLACES);

export const tableInit = (numberOfCols, _cellWidth, _cellHeight, _xOffset, _yOffset, _zOffset) => {
    return (i) => {
        const cellWidth = _.isUndefined(_cellWidth) ? 300 : _cellWidth;
        const cellHeight = _.isUndefined(_cellHeight) ? 200 : _cellHeight;
        const xOffset = _.isUndefined(_xOffset) ? -1330 : _xOffset;
        const yOffset = _.isUndefined(_yOffset) ? 990 : _yOffset;
        const zOffset = _.isUndefined(_zOffset) ? -1000 : _zOffset;
        const row = Math.floor(i / numberOfCols);
        const col = i % numberOfCols;
        const table = new THREE.Object3D();
        table.position.x = (col * cellWidth) + xOffset;
        table.position.y = -(row * cellHeight) + yOffset;
        table.position.z = zOffset;

        return table;
    }
}

export const table = tableInit(DEFAULT_NUMBER_PF_TABLE_COLUMNS);

export const sphere = (numberOfBodies, i) => {
    const phi = Math.acos(-1 + 2 * i / numberOfBodies);
    const theta = Math.sqrt((numberOfBodies - 1) * Math.PI) * phi;

    const sphere = new THREE.Object3D();
    sphere.position.x = 800 * Math.cos(theta) * Math.sin(phi);
    sphere.position.y = 800 * Math.sin(theta) * Math.sin(phi);
    sphere.position.z = 800 * Math.cos(phi);

    const vector = new THREE.Vector3();
    vector.copy(sphere.position).multiplyScalar(-2);
    sphere.lookAt(vector);

    return sphere
};

export const helix = (numberOfBodies, i) => {
    const helix = new THREE.Object3D();
    const vector = new THREE.Vector3();
    const phi = i/numberOfBodies * 2 * Math.PI;

    helix.position.x = 1000 * Math.sin(phi);
    helix.position.y = -(i * 8) + 500;
    helix.position.z = 1000 * Math.cos(phi);

    vector.x = -helix.position.x * 2;
    vector.y = -helix.position.y;
    vector.z = -helix.position.z * 2;

    helix.lookAt(vector);

    return helix;
};

export const ring = (numberOfBodies, i) => {
    const ring = new THREE.Object3D();
    const vector = new THREE.Vector3();
    const phi = i/numberOfBodies * 2 * Math.PI;

    ring.position.x = 3000 * Math.sin(phi);
    ring.position.y = 100;
    ring.position.z = 3000 * Math.cos(phi);

    vector.x = -ring.position.x * 2;
    vector.y = -ring.position.y;
    vector.z = -ring.position.z * 2;

    ring.lookAt(vector);

    return ring;
};

export const setPositionRotationOnObject = (object, position, rotation) => {
    Object.assign(object.position, position);
    object.rotation.x = rotation.x;
    object.rotation.y = rotation.y;
    object.rotation.z = rotation.z;
}

const addToRoot = (element, root, position, rotation) => {
    const object = new THREE.CSS3DObject(element);

    setPositionRotationOnObject(object, position, rotation);
    root.add(object);

    return object;
}

export const getArPositionRotation = (type, i, num, positionFunction) => {
    let three3dObject;

    switch (type) {
        case TYPE_HELIX:
             three3dObject = helix(num, i);
             break;


        case TYPE_SPHERE:
            three3dObject = sphere(num, i);
            break;


        case TYPE_RING:
            three3dObject = ring(num, i);
            break;


        case TYPE_SPHERE_RANDOM:
            if(_.isFunction(positionFunction)) {
                three3dObject = positionFunction(i);
            }
            else {
                three3dObject = randomSphere(i);
            }
            break;

        case TYPE_TABLE:
            if(_.isFunction(positionFunction)) {
                three3dObject = positionFunction(i);
            }
            else {
                three3dObject = table(i);
            }
            break;

        default:
    }

    const {position, rotation} = three3dObject;
    return {position, rotation};
}

const addDataToObject = (object, type, index, totalNum, positionFunction) => {
    const objectData = new ObjectData(index, type, totalNum, positionFunction);
    object._data = objectData;
}

export const setArPositionRotation = (element, root, type, i, totalNum, positionFunction) => {
    const {position, rotation} = getArPositionRotation(type, i, totalNum, positionFunction);
    const object = addToRoot(element, root, position, rotation);
    addDataToObject(object, type, i, totalNum, positionFunction);

    return object;
}
