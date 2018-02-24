import * as d3 from 'd3';

export const setRemoveClass = (selector, className, trueToSet, intervalInMs) => {
    d3.selectAll(selector)
        .each(function(_, i) {
            const element = this;
            const fct = () => d3.select(element).classed(className, trueToSet);
            if(intervalInMs > 0) {
                setTimeout(fct, i * intervalInMs);
            }
            else {
                fct();
            }
        })
}

export const setClass = (selector, className, intervalInMs) => {
    setRemoveClass(selector, className, true, intervalInMs);
}

export const setClasses = (selector, classNames) => {
    classNames.forEach((className) => {
        setClass(selector, className);
    })
}

export const removeClass = (selector, className, intervalInMs) => {
    setRemoveClass(selector, className, false, intervalInMs);
}

export const removeClasses = (selector, classNames) => {
    classNames.forEach((className) => {
        removeClass(selector, className);
    })
}

export const setClassStep = (selector, className, intervalInMs) => {
    return {
        f: () => setClass(selector,className, intervalInMs),
        b: () => removeClass(selector, className, intervalInMs)
    }
}

export const set2Classes = (selector, clasName1, className2, delay) => {
    setClass(selector, clasName1);
    setTimeout(() => setClass(selector, className2), delay);
}

export const set2ClassesStep = (selector, className1, className2, delay) => {
    return {
        f: () => set2Classes(selector, className1, className2, delay),
        b: () => removeClasses(selector, [className1, className2])
    }
}

export const classUtil = {
    setRemoveClass,
    setClass,
    removeClass,
    setClassStep,
    setClasses,
    removeClasses,
    set2Classes,
    set2ClassesStep
};
