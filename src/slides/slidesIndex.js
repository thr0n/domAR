import {log} from '../util/log';
import {setArPositionRotation, TYPE_RING} from '../arPositions';
import {init} from '../argonApp';
import './slides.css';
import {CommandHub} from './control/commandHub';
import {slideControl} from './control/SlideControl';

import {demoSlides} from './demoSlides/demoSlides';

const TWEEN = require('@tweenjs/tween.js');
slideControl.setTWEEN(TWEEN);

export const initSlides = async (rootSelector) => {
    new CommandHub();

    const withAr = false;

    if(withAr) {
        const {root, app} = init();

        app.updateEvent.on(() => {
            TWEEN.update();
        });

        const selection = await demoSlides(rootSelector);
        log.info("demo slides ready")
        selection.each(function (id, i) {
            const object = setArPositionRotation(this, root, TYPE_RING, i, selection.size());
            slideControl.addObject(id, object);
        });
    }
    else {

    }
}
