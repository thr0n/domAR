import {Slides} from '../Slides';
import {slidePlotly} from './slidePlotly';

const width = window.innerWidth;
const height = window.innerHeight;

export const demoSlides = () => {

    const slides = new Slides(width, height);
    const selection = slides.create(10);

    slidePlotly('');

}