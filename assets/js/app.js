import { accordions } from './data/data.js';

import Accordion from './accordion/index.js'

import { AccordionItem } from './components/AccordionItem.js';

let accordion = new Accordion({
    mode: 'toggle',
    element: document.querySelector('.accordion'),
    classNames: {
        headClassName: 'accordion__head--active',
        titleClassName: 'accordion__title--active',
        iconClassName: 'accordion__icon--active'
    }
});

accordion.init();

accordion.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: accordions
});