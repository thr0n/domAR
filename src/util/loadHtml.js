import $ from 'jquery';

import {log} from './log';

const vsprintf = require('sprintf-js').vsprintf;

export const loadHtmlWithSelector = (selector, pathToHtml) => {
    log.info(vsprintf("Load html (%s) into selector: %s", [pathToHtml, selector]));
    $(selector).load(pathToHtml);
}

export const loadHtml = (slideId, pathToHtml) => {
    loadHtmlWithSelector("#" + slideId, pathToHtml);
}


