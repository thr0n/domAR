export const call = (fct) => {
    if(isFunction(fct)) {
        fct();
    }
}

export const isFunction = (fct) => {
    return (typeof fct === 'function');
}
