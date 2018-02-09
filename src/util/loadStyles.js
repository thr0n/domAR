import * as _ from "lodash";

export const appendStyles = (pathToCssArray) => {
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
