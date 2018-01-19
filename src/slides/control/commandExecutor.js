import {slideControl} from './SlideControl';

const parse = (commandStr) => {
    try {
        const command = JSON.parse(commandStr);
        return  command;
    } catch (e) {
        console.log(e);
        return {
            command: "error"
        }
    }
}

export const execute = (commandStr) => {
    const command = parse(commandStr);

    switch (command.command) {
        case "pause":
            slideControl.pauseJs(command.slideId);
            break;

        case "resume":
            slideControl.resumeJs(command.slideId);
            break;

        default:
            console.log("cannot execute");
            console.log(command);
    }
}