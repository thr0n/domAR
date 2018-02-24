import * as $ from 'jquery';

const vsprintf = require('sprintf-js').vsprintf;

export const rotate = (selector, x, y, z, timeInMillis) => {
    const transform = vsprintf("rotateX(%sdeg) rotateY(%sdeg) rotateZ(%sdeg)", [x, y, z]);
    $(selector).animate({transform}, timeInMillis);
}

export const transfrom = {
    rotate
}