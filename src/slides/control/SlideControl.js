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
        this.shiftForwardCurrentSlideId();
    }

    setCurrentSlideId(slideId) {
        this.currentSlideId = slideId;
    }

    addSlideId(slideId) {
        this.slideIds.push(slideId);
    }

    shiftForwardCurrentSlideId() {
        const currentIndex = this.slideIds.indexOf(this.currentSlideId);
        const nextIndex = currentIndex >= this.slideIds.length - 1 ? 0 : currentIndex+1;
        this.currentSlideId = this.slideIds[nextIndex];
    }

    setStepsObject(slideId, steps, currentStepNumber = 0) {
        this.steps[slideId] = {steps, currentStepNumber};
    }

    getStepsObject = (slideId) => {
        return this.steps[slideId];
    }

    setCurrentStepsObject(steps, currentStepNumber = 0) {
        this.setStepsObject(this.currentSlideId, steps, currentStepNumber);
    }

    getCurrentStepsObject() {
        return this.getStepsObject(this.currentSlideId);
    }

    renderStepNumber() {
        const renderCounterElement = $("#" + this.currentSlideId + " .slidecounter");
        if(!_.isEmpty(renderCounterElement)) {
            const {steps, currentStepNumber} = this.getCurrentStepsObject();
            renderCounterElement.html(currentStepNumber + " / " + steps.length);
        }
    }

    incCurrentStepNumber() {
        const {steps, currentStepNumber} = this.getCurrentStepsObject();
        const newStepNumber = currentStepNumber+1;
        this.setCurrentStepsObject(steps, currentStepNumber+1);
        this.renderStepNumber();

        return newStepNumber;
    }

    decCurrentStepNumber() {
        const {steps, currentStepNumber} = this.getCurrentStepsObject();
        const newStepNumber = currentStepNumber-1;
        this.setCurrentStepsObject(steps, newStepNumber);
        this.renderStepNumber();

        return newStepNumber;
    }

    forwardStep() {
        const {steps, currentStepNumber} = this.getCurrentStepsObject();
        if(_.isEmpty(steps)) {
            return
        }
        if(currentStepNumber < steps.length) {
            const step = steps[currentStepNumber];
            fct.call(step.f);
            this.incCurrentStepNumber();
        }
    }

    backwardStep() {
        const {steps, currentStepNumber} = this.getCurrentStepsObject();
        if(_.isEmpty(steps) || !(currentStepNumber > 0)) {
            return
        }
        const newstepNumber = this.decCurrentStepNumber();
        const step = steps[newstepNumber];
        fct.call(step.b);
    }
}

export const slideControl = new SlideControl();
