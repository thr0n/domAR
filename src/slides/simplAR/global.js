let globalRoot;
let globalApp;

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
