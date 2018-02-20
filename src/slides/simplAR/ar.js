import * as _ from 'lodash';

import {init} from '../../argonApp';
import * as global from './global';
import {TYPE_HELIX, TYPE_RING, TYPE_SPHERE, TYPE_SPHERE_RANDOM} from '../../arPositions';
import {ring} from './setPositions';

const TWEEN = require('@tweenjs/tween.js');

export const initAr = () => {
    if(_.isEmpty(global.getGlobalRoot()) || _.isEmpty(global.getGlobalApp())) {
        const {root, app} = init();
        global.setGlobalRoot(root);
        global.setGlobalApp(app);
    }
}

export const initTween = () => {
    global.getGlobalApp().updateEvent.on(() => {
        TWEEN.update();
    });
}

export const ar = {
    initAr,
    initTween,
    ring,
    TYPE_HELIX, TYPE_RING, TYPE_SPHERE, TYPE_SPHERE_RANDOM
}
