import {log} from '../util/log';
import {setArPositionRotation, TYPE_RING} from '../arPositions';
import {init} from '../argonApp';
import {CommandHub} from './control/commandHub';
import {slideControl} from './control/SlideControl';

const TWEEN = require('@tweenjs/tween.js');
slideControl.setTWEEN(TWEEN);

const startSlideShow = (slideShowIntervalInSeconds) => {
    if(slideShowIntervalInSeconds > 0) {
        setInterval(() => {
            slideControl.nextSlide();
        }, slideShowIntervalInSeconds * 1000);
    }
}

export const initSlides = async (rootSelector, slideCreateFunction, param) => {
    new CommandHub();

    const withAr = true;

    if(withAr) {
        const slideShowIntervalInSeconds = param;
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

        startSlideShow(slideShowIntervalInSeconds);
    }
    else {
        const selection = await slideCreateFunction(rootSelector);
    }
}
