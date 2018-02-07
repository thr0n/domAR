import url from 'url';
import * as _ from 'lodash';

//import './demo.css'
//import 'materialize-css/dist/css/materialize.css';

import {initCubes} from './cubesIndex';
import {initRadars} from './radarsIndex';
import {initSlides} from './slides/slidesIndex';
import {parseQuery} from './parseQuery';
import {demoSlides} from "./slides/demoSlides/demoSlides";
import * as slide3dd3 from "./slides/3dd3/slides3dd3";

const BODY_TYPE_RADAR = "radar";
const BODY_TYPE_CUBE = "cube";
const BODY_TYPE_SLIDE_DEMO = "slideDemo";
const BODY_TYPE_SLIDE_3DD3 = "slide3dd3";

let queryMap = {};
const query = url.parse(window.location.href).query;
if(!_.isEmpty(query)) {
    queryMap = parseQuery(query);
}

let bodyType;
[BODY_TYPE_SLIDE_DEMO, BODY_TYPE_CUBE, BODY_TYPE_RADAR].forEach((type) => {
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

    case BODY_TYPE_SLIDE_DEMO:
        initSlides("#container", demoSlides)

    default:
        initSlides("#container", slide3dd3.init);
}
