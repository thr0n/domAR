import * as _ from 'lodash';

import {slideControl} from '../control/SlideControl';
import {paramValue} from '../../util/query';

const _waitForSteps = (stepNum, resolve) => {
    const currentStepsObject = slideControl.getCurrentStepsObject();
    if(!_.isUndefined(currentStepsObject)) {
        const currentSteps = currentStepsObject.steps;
        if(!_.isUndefined(currentSteps)) {
            const numberOfCurrentSteps = currentSteps.length;
            if(numberOfCurrentSteps > stepNum) {
                resolve();
            }
        }
    }

    setTimeout(() => _waitForSteps(stepNum, resolve), 100);
}

const _step = (numberOfSteps) => {
    if(numberOfSteps > 0) {
        slideControl.forwardStep();
        setTimeout(() => _step(numberOfSteps-1), 100);
    }
}

export const createReverseStep = (step) => {
    const reverseStep = {f: step.b, b: step.f}
    return {step, reverseStep}
}

export const init = () => {
    const stepNum = paramValue("step");
    if(stepNum > 0) {
        new Promise((resolve) => _waitForSteps(stepNum, resolve)).then(() => {
            _step(stepNum);
        })
    }
}

export const set = (slideId, steps) => {
    slideControl.setStepsObject(slideId, steps);
}

const doAll = (steps) => {
    steps.forEach((step) => step());
}

export const combineSteps = (steps) => {
    return {
        f: () => doAll(steps.map((step) => step.f)),
        b: () => doAll(steps.map((step) => step.b))
    }
}

export const steps = {
    set,
    createReverseStep,
    combineSteps
}
