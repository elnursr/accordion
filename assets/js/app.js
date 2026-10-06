import { accordions } from './data/data.js';

import Accordion from './accordion/index.js'

import { AccordionItem } from './components/AccordionItem.js';

let accordion = new Accordion({
    mode: 'toggle',
    wrapper: '.accordion',
    options: {
        colors: {
            head: {
                collapsed: '',
                expanded: 'darkred'
            }
        }
    }
});

accordion.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: accordions
});