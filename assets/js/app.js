import { accordions } from './data/data.js';

import Accordion from './accordion/index.js'

import { AccordionItem } from './components/AccordionItem.js';

let accordion = new Accordion({
    mode: 'toggle',
    container: 'accordion'
});

accordion.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: accordions
});