import * as _ from 'lodash';

import {createQueryMap, createHrefWithQueryMap} from '../util/query';

export const nextSlide = (newSlideId) => {
    const queryMap = createQueryMap();
    if(!_.isEmpty(queryMap.slide)) {
        queryMap.slide = newSlideId;
    }
    const href = createHrefWithQueryMap(queryMap);

    window.location.href = href;
}
