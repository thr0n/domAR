import * as _ from 'lodash';

const n = 100;
const dt = 0.015;

export class PlotlyDemo {

    constructor(containerId) {
        this.containerId = containerId;

        this.x = _.range(n).map(() => Math.random() * 2 - 1);
        this.y = _.range(n).map(() => Math.random() * 2 - 1);
        this.z = _.range(n).map(() => 30 + Math.random() * 10);

        this.paused = false;
    }

    compute() {
        const s = 10, b = 8/3, r = 28;

        for (let i = 0; i < n; i++) {
            let dx = s * (this.y[i] - this.x[i]);
            let dy = this.x[i] * (r - this.z[i]) - this.y[i];
            let dz = this.x[i] * this.y[i] - b * this.z[i];

            const xh = this.x[i] + dx * dt * 0.5;
            const yh = this.y[i] + dy * dt * 0.5;
            const zh = this.z[i] + dz * dt * 0.5;

            dx = s * (yh - xh);
            dy = xh * (r - zh) - yh;
            dz = xh * yh - b * zh;

            this.x[i] += dx * dt;
            this.y[i] += dy * dt;
            this.z[i] += dz * dt;
        }
    }

    update() {
        this.compute();

        window.Plotly.animate(this.containerId, {
            data: [{x: this.x, y: this.z}]
        }, {
            transition: {
                duration: 0,
            },
            frame: {
                duration: 0,
                redraw: false,
            }
        });

        if(!this.paused) {
            this.start();
        }
    }

    start() {
        requestAnimationFrame(() => {this.update()});
    }

    startDemo() {
        window.Plotly.plot(this.containerId, [{
            x: this.x,
            y: this.z,
            mode: 'markers'
        }], {
            xaxis: {range: [-40, 40]},
            yaxis: {range: [0, 60]}
        })

        this.start();
    }

    doPause() {
        this.paused = true;
    }

    doResume() {
        if(this.paused) {
            this.paused = false;
            this.start();
        }
    }
}

