import {execute} from './commandExecutor';

const host = window.location.hostname;
const port = 1337;

export const socket = new WebSocket("ws://" + host + ":" + port);
socket.onmessage = function (event) {
    const commandStr = event.data;
    console.log(commandStr);
    execute(commandStr);
}
