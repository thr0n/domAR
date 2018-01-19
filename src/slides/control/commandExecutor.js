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
            console.log("pause");
            slideControl.pauseJs(command.slideId);
            break;

        case "resume":
            console.log("resume");
            slideControl.resumeJs(command.slideId);
            break;

        default:
            console.log("cannot execute");
            console.log(command);
    }
}