import url from 'url';
import * as _ from 'lodash';

import './demo.css'
import {initCubes} from './cubesIndex';
import {initRadars} from './radarsIndex';
import {initSlides} from './slides/slidesIndex';
import {parseQuery} from './parseQuery';

const BODY_TYPE_RADAR = "radar";
const BODY_TYPE_CUBE = "cube";
const BODY_TYPE_SLIDE = "slide";

let queryMap = {};
const query = url.parse(window.location.href).query;
if(!_.isEmpty(query)) {
    queryMap = parseQuery(query);
}

let bodyType;
[BODY_TYPE_SLIDE, BODY_TYPE_CUBE, BODY_TYPE_RADAR].forEach((type) => {
    if(!_.isEmpty(queryMap[type])) {
        bodyType = type;
        return false;
    }
});

switch (bodyType) {
    case BODY_TYPE_CUBE:
        const nameOfTextSet = queryMap[BODY_TYPE_CUBE];
        initCubes(nameOfTextSet);
        break;

    case BODY_TYPE_RADAR:
        initRadars();
        break;

    default:
        initSlides();
}
