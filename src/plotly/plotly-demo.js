import * as _ from 'lodash';
import {Plotly} from './plotly-common';

const n = 100;
const dt = 0.015;

let x = _.range(n).map(() => Math.random() * 2 - 1);
let y = _.range(n).map(() => Math.random() * 2 - 1);
let z = _.range(n).map(() => 30 + Math.random() * 10);

export const startDemo = (containerId) => {
    Plotly.plot(containerId, [{
        x: x,
        y: z,
        mode: 'markers'
    }], {
        xaxis: {range: [-40, 40]},
        yaxis: {range: [0, 60]}
    })

    requestAnimationFrame(update);
}

const compute = () => {
    const s = 10, b = 8/3, r = 28;

    for (var i = 0; i < n; i++) {
        let dx = s * (y[i] - x[i]);
        let dy = x[i] * (r - z[i]) - y[i];
        let dz = x[i] * y[i] - b * z[i];

        const xh = x[i] + dx * dt * 0.5;
        const yh = y[i] + dy * dt * 0.5;
        const zh = z[i] + dz * dt * 0.5;

        dx = s * (yh - xh);
        dy = xh * (r - zh) - yh;
        dz = xh * yh - b * zh;

        x[i] += dx * dt;
        y[i] += dy * dt;
        z[i] += dz * dt;
    }
}

const update = () => {
    compute();

    Plotly.animate('graph', {
        data: [{x: x, y: z}]
    }, {
        transition: {
            duration: 0,
        },
        frame: {
            duration: 0,
            redraw: false,
        }
    });

    requestAnimationFrame(update);
}

