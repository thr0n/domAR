import $ from 'jquery';
import * as _ from 'lodash';

const loadHtml = (slideId, pathToHtml) => {
    $("#" + slideId).load(pathToHtml);
}

const clearHtml = (slideId) => {
    $("#" + slideId).empty();
}

const loadScript = (pathToScript) => {
    return new Promise((resolve) => {
        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.onload = () => {
            resolve();
        }
        document.head.appendChild(scriptElement);
        scriptElement.src = pathToScript;
    })
}

const NUMBER_OF_TRIES = 1000;
const WAIT_TIME = 10;

const waitForReadyRecursive = (ctr, readyFunction, resolve, reject) => {
    if(readyFunction()) {
        resolve();
    }
    else {
        if(ctr > NUMBER_OF_TRIES) {
            reject("readyFunction not true after " + NUMBER_OF_TRIES + " tries");
        }
        else {
            setTimeout(() => {
                waitForReadyRecursive(readyFunction, resolve);
            }, WAIT_TIME);
        }
    }
}

const waitForReady = (readyFunction, resolve, reject) => {
    if(typeof(readyFunction) === 'function') {
        waitForReadyRecursive(0, readyFunction, resolve, reject)
    }
    else {
        reject("readyFunctionn is not a function");
    }
}

const loadScriptAndWait = (pathToScriptWithReadyFunction) => {
    return new Promise((resolve, reject) => {
        if(typeof(pathToScriptWithReadyFunction) === 'object' && !_.isEmpty(pathToScriptWithReadyFunction.pathToScript)) {
            loadScript(pathToScriptWithReadyFunction.pathToScript).then(() => {
                waitForReady(pathToScriptWithReadyFunction.readyFunction, resolve, reject);
            })
        }
    })
}

const loadScriptAndPossiblyWait = (scriptThingy) => {
    if(typeof(scriptThingy) === 'string') {
        return loadScript(scriptThingy);
    }
    else {
        return loadScriptAndWait(scriptThingy);
    }
}

const appendScriptsRecursive = (index, scriptThingyArray, resolve) => {
    if(!_.isEmpty(scriptThingyArray) && index < scriptThingyArray.length) {
        const scriptThingy = scriptThingyArray[index];
        loadScriptAndPossiblyWait(scriptThingy).then(() => {
            appendScriptsRecursive(index+1, scriptThingyArray, resolve);
        })
    }
    else {
        resolve();
    }
}

const appendScripts = (scriptThingyArray) => {
    return new Promise((resolve) => {
        appendScriptsRecursive(0, scriptThingyArray, resolve);
    })
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
    appendStyles(config.pathToCssArray);
    loadHtml(slideId, config.pathToHtml);
    appendScripts([...config.pathToJsArray, ...config.scriptThingyArray]).then(() => {
        start(config.startFunction);
    });
}

export class HtmlSlide {

    constructor(slideId, config) {
        this.slideId = slideId;
        this.config = config;

        htmlSlide(slideId, config);
    }

    setReloadInterval(ms) {
        this.reloadInterval = setInterval(this.reload, ms);
    }

    clearReloadInterval() {
        clearInterval(this.reloadInterval);
    }

    reload() {
        clearHtml(this.slideId);
        loadHtml(this.config.pathToHtml);
        start(this.config.startFunction);
    }
}
