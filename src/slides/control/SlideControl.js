import * as fct from '../../util/fct';

class SlideControl {

    constructor() {
        this.configs = {};
    }

    registerConfig(slideId, config) {
        this.configs[slideId] = config;
    }

    pauseJs(slideId) {
        const config = this.configs[slideId];
        if(fct.isFunction(config.pauseFunction)) {
            config.pauseFunction();
        }
    }

    resumeJs(slideId) {
        const config = this.configs[slideId];
        if(fct.isFunction(config.resumeFunction)) {
            config.resumeFunction();
        }
    }
}

export const slideControl = new SlideControl();
