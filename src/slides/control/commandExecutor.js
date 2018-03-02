import {log} from '../../util/log';
import {slideControl} from './SlideControl';

const parse = (commandStr) => {
    try {
        const command = JSON.parse(commandStr);
        return  command;
    } catch (e) {
        log.error(e);
        return {
            command: "error"
        }
    }
}

export const COMMAND_FWD = "fwd";
export const COMMAND_BACK = "back";
export const COMMAND_NEXT = "next";
export const COMMAND_PREV = "prev";
export const COMMAND_LAST = "last";
export const COMMAND_FIRST = "first";

export const executeCommand = (command, slideId) => {

    log.info("command: " + command);

    switch (command) {
        case "pause":
            slideControl.pauseJs(slideId);
            break;

        case "resume":
            slideControl.resumeJs(slideId);
            break;

        case COMMAND_FWD:
            slideControl.forwardStep();
            break;

        case COMMAND_BACK:
            slideControl.backwardStep();
            break;

        case COMMAND_LAST:
            slideControl.gotoLastStep();
            break;

        case COMMAND_FIRST:
            slideControl.gotoFirstStep();
            break;

        case COMMAND_NEXT:
            slideControl.fwdSlide();
            break;

        case COMMAND_PREV:
            slideControl.backSlide();
            break;

        case "connected":
            // do nothing
            break;

        default:
            log.error("cannot execute: " + command);
    }
}

export const execute = (commandObjStr) => {
    const commandObj = parse(commandObjStr);

    executeCommand(commandObj.command, commandObj.slideId);
}