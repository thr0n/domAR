import * as _ from 'lodash';

import {log} from '../../util/log';
import * as fct from '../../util/fct';

import * as arTransform from '../../arTransform';

class SlideControl {

    constructor() {
        this.configs = {};
        this.steps = {};
    }

    setTWEEN(TWEEN) {
        this.TWEEN = TWEEN;
    }

    registerConfig(slideId, config) {
        log.info("registered: " + slideId);
        log.info(config);
        this.configs[slideId] = config;
    }

    createAndRegisterConfig(slideId) {
        log.info("created new config for: " + slideId);
        const config = {};
        this.registerConfig(slideId, config);

        return config;
    }

    addObject(slideId, object) {
        log.info("add object to slideId: " + slideId);
        log.info(object);
        const config = this.configs[slideId];
        if(_.isObject(config)) {
            config.object = object;
        }
    }

    getAllObjects() {
        const allObjects = _.map(this.configs, 'object');
        return allObjects;
    }

    doForAll(fctName) {
        _.forOwn(this.configs, (config) => {
            SlideControl.doForOneWithConfig(config, fctName);
        })
    }

    doForOneWithSlideId(slideId, fctName) {
        const config = this.configs[slideId];
        SlideControl.doForOneWithConfig(config, fctName);
    }

    static doForOneWithConfig(config, fctName) {
        if(!_.isEmpty(config)) {
            const configFct = config[fctName];
            if(fct.isFunction(configFct)) {
                configFct();
            }
        }
    }

    doForOneOrForAll(param, fctName) {
        if(param === ":all") {
            this.doForAll(fctName);
        }
        else {
            this.doForOneWithSlideId(param, fctName);
        }
    }

    pauseJs(param) {
        this.doForOneOrForAll(param, "pauseFunction");
    }

    resumeJs(param) {
        this.doForOneOrForAll(param, "resumeFunction");
    }

    nextSlide() {
        const allObjects = this.getAllObjects();
        arTransform.allNext(allObjects, this.TWEEN);
    }

    setCurrentSlideId(slideId) {
        this.currentSlideId = slideId;
        this.currentStep = 0;
    }

    setSteps(slideId, steps) {
        this.steps[slideId] = steps;
    }

    getSteps = (slideId) => {
        return this.steps[slideId];
    }

    setStepsForCurrentSlide(steps) {
        if(!_.isEmpty(this.currentSlideId)) {
            this.setSteps(this.currentSlideId, steps);
        }
    }

    getCurrentSteps() {
        return this.getSteps(this.currentSlideId);
    }

    forwardStep() {
        const steps = this.getCurrentSteps();
        if(!_.isEmpty(steps)) {
            const step = steps[this.currentStep];
            if(!_.isEmpty(step)) {
                const forwardStep = step.f;
                if(fct.isFunction(forwardStep)) {
                    forwardStep();
                }
            }
        }
    }
}

export const slideControl = new SlideControl();
