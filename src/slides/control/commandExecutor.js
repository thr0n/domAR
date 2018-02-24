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

export const executeCommand = (command, slideId) => {

    switch (command) {
        case "pause":
            log.info("command: pause");
            slideControl.pauseJs(slideId);
            break;

        case "resume":
            log.info("command: resume");
            slideControl.resumeJs(slideId);
            break;

        case "fwd":
            log.info("command: fwd");
            slideControl.forwardStep();
            break;

        case "back":
            log.info("command: back");
            slideControl.backwardStep();
            break;

        case "next":
            log.info("command: next");
            slideControl.fwdSlide();
            break;

        case "prev":
            log.info("command: prev");
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