const NUMBER_OF_TRIES = 1000;
const WAIT_TIME = 10;

const _waitForReadyRecursive = (ctr, readyFunction, resolve, reject, name) => {
    if(readyFunction()) {
        console.log("script ready: " + name);
        console.log(readyFunction);
        resolve();
    }
    else {
        if(ctr > NUMBER_OF_TRIES) {
            reject("readyFunction not true after " + NUMBER_OF_TRIES + " tries: " + name);
        }
        else {
            setTimeout(() => {
                _waitForReadyRecursive(ctr+1, readyFunction, resolve, reject, name);
            }, WAIT_TIME);
        }
    }
}

export const waitForReady = (readyFunction, resolve, reject, name) => {
    if(typeof(readyFunction) === 'function') {
        _waitForReadyRecursive(0, readyFunction, resolve, reject, name)
    }
    else {
        reject("readyFunctionn is not a function: " + name);
    }
}

export const waitForReadyPromise = (readyFunction, name) => {
    if(typeof readyFunction === 'function') {
        return new Promise((resolve, reject) => {
            console.log("waitForReadyPromise: " + name);
            waitForReady(readyFunction, resolve, reject, name);
        })
    }
    else {
        return Promise.resolve();
    }
}

