let globalRoot;
let globalApp;
let TWEEN;

export const setGlobalRoot = (root) => {
    globalRoot = root;
}

export const setGlobalApp = (app) => {
    globalApp = app;
}

export const getGlobalRoot = () => {
    return globalRoot;
}

export const getGlobalApp = () => {
    return globalApp;
}

export const setTween = (_tween) => {
    TWEEN = _tween;
}

export const getTween = () => {
    return TWEEN;
}