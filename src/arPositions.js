import * as _ from 'lodash';
import {THREE} from './threeHelper';

export const TYPE_HELIX = "helix";
export const TYPE_SPHERE = "sphere";
export const TYPE_SPHERE_RANDOM = "sphere-random";
export const TYPE_RING = "ring";

export const DEFAULT_NUMBER_OF_POSSIBLE_PLACES = 50;

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

    ring.position.x = 1000 * Math.sin(phi);
    ring.position.y = 100;
    ring.position.z = 1000 * Math.cos(phi);

    vector.x = -ring.position.x * 2;
    vector.y = -ring.position.y;
    vector.z = -ring.position.z * 2;

    ring.lookAt(vector);

    return ring;
};

const addToRoot = (that, root, position, rotation) => {
    const object = new THREE.CSS3DObject(that);

    Object.assign(object.position, position);
    object.rotation.x = rotation.x;
    object.rotation.y = rotation.y;
    object.rotation.z = rotation.z;

    root.add(object);
}

export const setArPosition = (that, root, type, i, num) => {
    switch (type) {
        case TYPE_HELIX: {
            const {position, rotation} = helix(num, i);
            addToRoot(that, root, position, rotation);
            break;
        }

        case TYPE_SPHERE: {
            const {position, rotation} = sphere(num, i);
            addToRoot(that, root, position, rotation);
            break;
        }

        case TYPE_RING: {
            const {position, rotation} = ring(num, i);
            addToRoot(that, root, position, rotation);
            break;
        }

        case TYPE_SPHERE_RANDOM: {
            const {position, rotation} = randomSphere(i);
            addToRoot(that, root, position, rotation);
            break;
        }

        default:
    }
}

