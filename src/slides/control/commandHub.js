import {slideControl} from './SlideControl';

const host = window.location.hostname;
const port = 1337;

export const socket = new WebSocket("ws://" + host + ":" + port);
socket.onmessage = function (event) {
    console.log(event.data);
}
