import * as _ from 'lodash';
import * as $ from 'jquery';

import {log} from '../../util/log';
import * as fct from '../../util/fct';

import * as arTransform from '../../ar/arTransform';

class SlideControl {

    constructor() {
        this.configs = {};
        this.steps = {};
        this.slideIds = [];
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
        this.shiftCurrentSlideId();
    }

    setCurrentSlideId(slideId) {
        this.currentSlideId = slideId;
        this.currentStepNumber = 0;
    }

    getCurrentSlideId() {
        return this.currentSlideId;
    }

    addSlideId(slideId) {
        this.slideIds.push(slideId);
    }

    shiftCurrentSlideId() {
        const currentIndex = this.slideIds.indexOf(this.currentSlideId);
        const nextIndex = currentIndex >= this.slideIds.length - 1 ? 0 : currentIndex+1;
        this.currentSlideId = this.slideIds[nextIndex];
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

    nextStep(trueIfForward) {
        const nextStepNumber = this.currentStepNumber + (trueIfForward ? +1 : -1);
        const nextStep = this.steps[nextStepNumber];
        if(!_.isEmpty(nextStep)) {

        }
    }

    renderStepNumber() {
        const renderCounterElement = $("#" + this.currentSlideId + " .slidecounter");
        if(!_.isEmpty(renderCounterElement)) {
            renderCounterElement.html(this.currentStepNumber + " / " + this.getCurrentSteps().length);
        }
    }

    incCurrentStepNumber() {
        this.currentStepNumber++;
        this.renderStepNumber();
    }

    decCurrentStepNumber() {
        this.currentStepNumber--;
        this.renderStepNumber();
    }

    forwardStep() {
        const steps = this.getCurrentSteps();
        if(_.isEmpty(steps)) {
            return
        }
        if(this.currentStepNumber < steps.length) {
            const step = steps[this.currentStepNumber];
            fct.call(step.f);
            this.incCurrentStepNumber();
        }
    }

    backwardStep() {
        const steps = this.getCurrentSteps();
        if(_.isEmpty(steps) || !(this.currentStepNumber > 0)) {
            return
        }
        this.decCurrentStepNumber();
        const step = steps[this.currentStepNumber];
        fct.call(step.b);
    }
}

export const slideControl = new SlideControl();
