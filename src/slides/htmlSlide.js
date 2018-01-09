import $ from 'jquery';
import * as _ from 'lodash';

const loadHtml = (slideId, pathToHtml) => {
    $("#" + slideId).load(pathToHtml);
}

const appendScriptsRecursive = (index, pathToJsArray) => {
    if(!_.isEmpty(pathToJsArray) && index < pathToJsArray.length) {
        const scriptElement = document.createElement("script");
        scriptElement.type = "text/javascript";
        scriptElement.onload = () => {
            appendScriptsRecursive(index+1, pathToJsArray);
        }
        document.head.appendChild(scriptElement);
        scriptElement.src = pathToJsArray[index];
    }
}

const appendStyles = (pathToCssArray) => {
    if(!_.isEmpty(pathToCssArray)) {
        pathToCssArray.forEach((pathToCss) => {
            const linkElement = document.createElement("link");
            linkElement.setAttribute("rel", "stylesheet");
            linkElement.setAttribute("type", "text/css");
            linkElement.setAttribute("href", pathToCss);
            document.head.appendChild(linkElement);
        })
    }
}

export const htmlSlide = (slideId, config) => {
    appendStyles(config.pathToCssArray);
    loadHtml(slideId, config.pathToHtml);
    appendScriptsRecursive(0, config.pathToJsArray);
}
