import $ from 'jquery';
import * as _ from 'lodash';

import {log} from '../util/log';
import * as fct from '../util/fct';
import {waitForReadyPromise} from '../util/waitForReady';
import {appendScripts, appendScriptsWithReadyFunction} from '../util/loadScript';
import {slideControl} from './control/SlideControl';

const loadHtml = (slideId, pathToHtml) => {
    log.info("load html: " + pathToHtml);
    $("#" + slideId).load(pathToHtml);
}

const clearHtml = (slideId) => {
    $("#" + slideId).empty();
}

export const appendStyles = (pathToCssArray) => {
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

export const htmlSlide = (slideId, config) => {
    return new Promise((resolve, reject) => {
        config.scriptThingyArray = config.scriptThingyArray || [];
        config.pathToJsArray = config.pathToJsArray || [];

        appendStyles(config.pathToCssArray);
        loadHtml(slideId, config.pathToHtml);

        appendScriptsWithReadyFunction([...config.pathToJsArray, ...config.scriptThingyArray], config.readyFunction, "final").then(() => {
            log.info("ready: " + slideId);
            slideControl.registerConfig(slideId, config);
            fct.call(config.startFunction);
            resolve();
        })
    })
}

export class HtmlSlide {

    constructor(slideId, config) {
        this.slideId = slideId;
        this.config = config;

        this.startedPromise = htmlSlide(slideId, config);
    }

    getStartedPromise() {
        return this.startedPromise;
    }

    setPause(pauseIsOn) {
        this.pauseIsOn = pauseIsOn;
    }

    setReloadInterval(ms) {
        this.reloadInterval = setInterval(() => {
            this.reload();
        }, ms);
    }

    clearReloadInterval() {
        clearInterval(this.reloadInterval);
    }

    setResetInterval(ms) {
        this.resetInterval = setInterval(() => {
            this.reset();
        }, ms);
    }

    clearResetInterval() {
        clearInterval(this.resetInterval);
    }

    reset() {
        this.startedPromise.then(() => {
            fct.call(this.config.resetFunction);
        })
    }

    reload() {
        this.startedPromise.then(() => {
            clearHtml(this.slideId);
            loadHtml(this.slideId, this.config.pathToHtml);
            fct.call(this.config.startFunction);
        })
    }
}
