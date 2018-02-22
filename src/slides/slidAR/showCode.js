import * as $ from 'jquery';

const Prism = require('prismjs');

export const css = (selector, cssString) => {
    const html = Prism.highlight(cssString, Prism.languages.css);
    $(selector).html(html);
}

export const showCode = {
    css
}
