export const parseQuery = (query) => {
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
