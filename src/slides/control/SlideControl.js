import * as _ from 'lodash';

import * as fct from '../../util/fct';

class SlideControl {

    constructor() {
        this.configs = {};
    }

    registerConfig(slideId, config) {
        console.log("registered: " + slideId);
        console.dir(config);
        this.configs[slideId] = config;
    }

    doForAll(fctName) {
        _.forOwn(this.configs, (config) => {
            this.doForOneWithConfig(config, fctName);
        })
    }

    doForOneWithSlideId(slideId, fctName) {
        const config = this.configs[slideId];
        this.doForOneWithConfig(config, fctName);
    }

    doForOneWithConfig(config, fctName) {
        if(!_.isEmpty(config)) {
            const configFct = config[fctName];
            if(fct.isFunction(configFct)) {
                configFct();
            }
        }
    }

    doForOneOrForAll(param, fctName) {
        if(param == ":all") {
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
}

export const slideControl = new SlideControl();
