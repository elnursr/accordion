import { accordions } from './data/data.js';

import { AccordionItem } from './components/AccordionItem.js';

import Accordion from './accordion/index.js'

let accordion = new Accordion({
    mode: 'toggle',
    // widthItems: '75%',
    elements: {
        element: document.querySelector('.accordion'),
        elementItems: document.querySelectorAll('.accordion__item'),
        headElements: document.querySelectorAll('.accordion__head'),
        bodyElements: document.querySelectorAll('.accordion__body'),
        titleElements: document.querySelectorAll('.accordion__title'),
        iconElements: document.querySelectorAll('.accordion__icon'),
    },
    classNames: {
        headClassName: 'accordion__head--active',
        titleClassName: 'accordion__title--active',
        iconClassName: 'accordion__icon--active'
    }
});

accordion.init();