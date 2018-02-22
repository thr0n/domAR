import * as _ from "lodash";

export const createSlide = (createFct, filename, selectedFilename) => {
    if(_.isEmpty(selectedFilename) ||  filename === selectedFilename) {
        return createFct(filename);
    }
    else {
        return Promise.resolve();
    }
}
