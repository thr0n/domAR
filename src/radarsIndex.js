import Radars from './Radars';
import {setArPosition, TYPE_RING} from './arPositions';
import {init} from './argonApp';

export const initRadars = () => {
    const {root} = init();
    const radars = new Radars(250);
    const radarSvgs = radars.draw();
    radarSvgs.each(function (d, i) {
        setArPosition(this, root, TYPE_RING, i, radars.numberOfRadars())
    });
}
