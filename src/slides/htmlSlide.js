import $ from 'jquery';
import * as _ from 'lodash';

import {waitForReadyPromise} from '../util/waitForReady';
import {appendScripts} from '../util/loadScript';

const loadHtml = (slideId, pathToHtml) => {
    $("#" + slideId).load(pathToHtml);
}

const clearHtml = (slideId) => {
    $("#" + slideId).empty();
}

const appendStyles = (pathToCssArray) => {
    if(!_.isEmpty(pathToCssArray)) {
        pathToCssArray.forEach((pathToCss) => {
            const linkElement = document.createElement("link");
            linkElement.setAttribute("rel", "stylesheet");
            linkElement.setAttribute("type", "text/css");
            linkElement.setAttribute("href", pathToCss);
            document.head.appendChild(linkElement);
        })
    }
}

const start = (startFunction) => {
    if(typeof(startFunction) === 'function') {
        startFunction();
    }
}

export const htmlSlide = (slideId, config) => {
    config.scriptThingyArray = config.scriptThingyArray || [];
    config.pathToJsArray = config.pathToJsArray || [];

    appendStyles(config.pathToCssArray);
    loadHtml(slideId, config.pathToHtml);
    appendScripts([...config.pathToJsArray, ...config.scriptThingyArray]).then(() => {
        waitForReadyPromise(config.readyFunction, "final").then(() => {
            start(config.startFunction);
        })
    });

}

export class HtmlSlide {

    constructor(slideId, config) {
        this.slideId = slideId;
        this.config = config;

        htmlSlide(slideId, config);
    }

    setReloadInterval(ms) {
        this.reloadInterval = setInterval(() => {
            this.reload();
        }, ms);
    }

    clearReloadInterval() {
        clearInterval(this.reloadInterval);
    }

    reload() {
        clearHtml(this.slideId);
        loadHtml(this.slideId, this.config.pathToHtml);
        start(this.config.startFunction);
    }
}
