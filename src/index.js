import url from 'url';
import * as _ from 'lodash';

import './demo.css'
import {initCubes} from './cubesIndex'
import {initRadars} from './radarsIndex'
import {parseQuery} from './parseQuery';

const BODY_TYPE_RADAR = "radar";
const BODY_TYPE_CUBE = "cube";

let bodyType = BODY_TYPE_RADAR;
let queryMap = {};
const query = url.parse(window.location.href).query;
if(!_.isEmpty(query)) {
    queryMap = parseQuery(query);
}

if(!_.isEmpty(queryMap[BODY_TYPE_CUBE])) {
    bodyType = BODY_TYPE_CUBE;
}

switch (bodyType) {
    case BODY_TYPE_CUBE:
        const nameOfTextSet = queryMap[BODY_TYPE_CUBE];
        initCubes(nameOfTextSet);
        break;

    default:
        initRadars();
}
