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

export const execute = (commandStr) => {
    const command = parse(commandStr);

    switch (command.command) {
        case "pause":
            log.info("command: pause");
            slideControl.pauseJs(command.slideId);
            break;

        case "resume":
            log.info("command: resume");
            slideControl.resumeJs(command.slideId);
            break;

        case "next":
            log.info("command: next");
            slideControl.nextSlide();
            break;

        case "connected":
            // do nothing
            break;

        default:
            log.error("cannot execute: " + commandStr);
    }
}