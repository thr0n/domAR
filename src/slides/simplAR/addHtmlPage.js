import {loadHtmlWithSelector} from '../htmlSlide';

export const addHtmlPage = (containerSelector, pathToHtmlPage) => {
    loadHtmlWithSelector(containerSelector, pathToHtmlPage);
}
