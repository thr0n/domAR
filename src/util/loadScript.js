import {waitForReady} from "./waitForReady";
import * as _ from "lodash";

const _loadScript = (pathToScript) => {
    return new Promise((resolve) => {
        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.onload = () => {
            console.log("script: " + pathToScript + " loaded");
            resolve();
        }
        document.head.appendChild(scriptElement);
        scriptElement.src = pathToScript;
    })
}

const _loadScriptAndWait = (pathToScriptWithReadyFunction) => {
    return new Promise((resolve, reject) => {
        if(typeof(pathToScriptWithReadyFunction) === 'object' && !_.isEmpty(pathToScriptWithReadyFunction.pathToScript)) {
            _loadScript(pathToScriptWithReadyFunction.pathToScript).then(() => {
                console.log("wait for ready for script: " + pathToScriptWithReadyFunction.pathToScript);
                waitForReady(pathToScriptWithReadyFunction.readyFunction, resolve, reject, pathToScriptWithReadyFunction.pathToScript);
            })
        }
    })
}

const _loadScriptAndPossiblyWait = (scriptThingy) => {
    if(typeof(scriptThingy) === 'string') {
        return _loadScript(scriptThingy);
    }
    else {
        return _loadScriptAndWait(scriptThingy);
    }
}

const _appendScriptsRecursive = (index, scriptThingyArray, resolve) => {
    if(!_.isEmpty(scriptThingyArray) && index < scriptThingyArray.length) {
        const scriptThingy = scriptThingyArray[index];
        _loadScriptAndPossiblyWait(scriptThingy).then(() => {
            _appendScriptsRecursive(index+1, scriptThingyArray, resolve);
        })
    }
    else {
        resolve();
    }
}

export const appendScripts = (scriptThingyArray) => {
    return new Promise((resolve) => {
        _appendScriptsRecursive(0, scriptThingyArray, resolve);
    })
}

