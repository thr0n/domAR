import {log} from '../../util/log';

import {execute} from './commandExecutor';

const host = window.location.hostname;
const port = 1337;

export class CommandHub {
    constructor() {
        if(!host.startsWith("localhost")) {
            return
        }
        
        this.socket = new WebSocket("ws://" + host + ":" + port);

        this.socket.onmessage = function (event) {
            const commandStr = event.data;
            log.info(commandStr);
            execute(commandStr);
        }
    }
}
