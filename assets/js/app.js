import { accordions } from './data/data.js';

import { AccordionItem } from './components/AccordionItem.js';

import Accordion from './accordion/index.js'

let accordion = new Accordion({
    mode: 'toggle',
    widthItems: '75%',
    elements: {
        element: document.querySelector('.accordion'),
        elementItems: document.querySelectorAll('.accordion__item'),
        headerElements: document.querySelectorAll('.accordion__head'),
        bodyElements: document.querySelectorAll('.accordion__body'),
        iconElements: document.querySelectorAll('.accordion__icon'),
        titleElements: document.querySelectorAll('.accordion__title')
    },
    classNames: {
        iconClassName: 'accordion__icon--active',
        titleClassName: 'accordion__title--active'
    }
});

accordion.init();