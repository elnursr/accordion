import Accordion from './accordion/index.js'

import { AccordionItem } from './components/AccordionItem.js';

import { woflensteins, mortal_kombats } from './data/data.js';

const woflenstein = new Accordion({
    mode: 'toggle',
    wrapper: '.woflenstein',
    options: {
        colors: {
            head: {
                expanded: '#c62017'
            }
        }
    }
});

woflenstein.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: woflensteins
});

const mortal_kombat = new Accordion({
    mode: 'switch',
    wrapper: '.mortal-kombat',
    options: {
        colors: {
            head: {
                expanded: '#db8e19'
            }
        }
    }
});

mortal_kombat.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: mortal_kombats
});