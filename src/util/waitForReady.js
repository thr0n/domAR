import {log} from './log';
import * as fct from './fct';

const NUMBER_OF_TRIES = 1000;
const WAIT_TIME = 10;

const _waitForReadyRecursive = (ctr, readyFunction, resolve, reject, name) => {
    if(readyFunction()) {
        log.info("script ready: " + name);
        log.info(readyFunction);
        resolve();
    }
    else {
        if(ctr > NUMBER_OF_TRIES) {
            reject("readyFunction not true after " + NUMBER_OF_TRIES + " tries: " + name);
            log.info(readyFunction);
        }
        else {
            setTimeout(() => {
                _waitForReadyRecursive(ctr+1, readyFunction, resolve, reject, name);
            }, WAIT_TIME);
        }
    }
}

export const waitForReady = (readyFunction, resolve, reject, name) => {
    if(fct.isFunction(readyFunction)) {
        _waitForReadyRecursive(0, readyFunction, resolve, reject, name)
    }
    else {
        reject("readyFunctionn is not a function: " + name);
    }
}

export const waitForReadyPromise = (readyFunction, name) => {
    if(fct.isFunction(readyFunction)) {
        return new Promise((resolve, reject) => {
            log.info("waitForReadyPromise: " + name);
            waitForReady(readyFunction, resolve, reject, name);
        })
    }
    else {
        return Promise.resolve();
    }
}

