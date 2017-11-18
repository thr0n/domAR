// from http://bl.ocks.org/jdarling/06019d16cb5fd6795edf
// or http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/

export const hue2rgb = (p, q, t) => {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
};

export const hslToRgb = (h, s, l) => {
    let r, g, b;

    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
};

const GOLDEN_RATIO_CONJUGATE = 0.618033988749895;

export const randomColor = function*() {
    let h = Math.random();

    while(true) {
        h += GOLDEN_RATIO_CONJUGATE;
        h %= 1;
        yield hslToRgb(h, 0.5, 0.60);
    }
};
