import url from "url";
import * as _ from "lodash";

const parseQuery = (query) => {
    const parts = query.split("&");
    let queryMap = {};
    parts.forEach((part) => {
        const keyVal = part.split("=");
        if(keyVal.length === 1) {
            queryMap[keyVal[0]] = undefined;
        }
        else {
            queryMap[keyVal[0]] = keyVal[1];
        }
    });

    return queryMap
};

export const createQueryMap = () => {
    const query = url.parse(window.location.href).query;
    if(!_.isEmpty(query)) {
        return parseQuery(query);
    }

    return {}
}

export const paramValue = (paramName) => {
    const queryMap = createQueryMap();
    return queryMap[paramName];
}

export const firstParamSet = (paramNameList) => {
    const queryMap = createQueryMap();
    for(let i = 0; i < paramNameList.length; i++) {
        let paramName = paramNameList[i];
        if(!_.isEmpty(queryMap[paramName])) {
            return paramName;
        }
    }

    return ""
}
