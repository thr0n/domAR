import {log} from '../util/log';
import {setArPositionRotation, TYPE_RING} from '../arPositions';
import {init} from '../argonApp';
import {CommandHub} from './control/commandHub';
import {slideControl} from './control/SlideControl';

const TWEEN = require('@tweenjs/tween.js');
slideControl.setTWEEN(TWEEN);

export const initSlides = async (rootSelector, slideCreateFunction) => {
    new CommandHub();

    const withAr = true;

    if(withAr) {
        const {root, app} = init();

        app.updateEvent.on(() => {
            TWEEN.update();
        });

        const selection = await slideCreateFunction(rootSelector);
        log.info("demo slides ready")
        selection.each(function (id, i) {
            const object = setArPositionRotation(this, root, TYPE_RING, i, selection.size());
            slideControl.addObject(id, object);
        });
    }
    else {
        const selection = await slideCreateFunction(rootSelector);
    }
}
