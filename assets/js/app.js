import { woflensteins, mortal_kombats } from './data/data.js';

import Accordion from './accordion/index.js'

import { AccordionItem } from './components/AccordionItem.js';

let woflenstein = new Accordion({
    mode: 'toggle',
    wrapper: '.woflenstein',
    options: {
        colors: {
            head: {
                collapsed: '',
                expanded: '#c62017'
            }
        }
    }
});

let mortal_kombat = new Accordion({
    mode: 'switch',
    wrapper: '.mortal-kombat',
    options: {
        colors: {
            head: {
                collapsed: '',
                expanded: '#db8e19'
            }
        }
    }
});

woflenstein.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: woflensteins
});

mortal_kombat.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: mortal_kombats
});