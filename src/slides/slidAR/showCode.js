import * as $ from 'jquery';

const vsprintf = require('sprintf-js').vsprintf;

const Prism = require('prismjs');

export const putIntoPre = (language, html) => {
    return vsprintf('<pre class="language-%s">%s</pre>', [language, html]);
}

export const css = (selector, cssString) => {
    const html = Prism.highlight(cssString, Prism.languages.css);
    const withPre = putIntoPre("css", html);
    $(selector).html(withPre);
}

export const remove = (selector) => {
    $(selector).empty();
}

export const cssStep = (selector, cssString) => {
    return {
        f: () => css(selector, cssString),
        b: () => remove(selector)
    }
}

export const cssStepWithReverse = (selector, cssString) => {
    const step = cssStep(selector, cssString);
    const reverseStep = {
        f: step.b,
        b: step.f
    }

    return {step, reverseStep}
}

export const showCode = {
    css,
    remove,
    cssStep,
    cssStepWithReverse
}
