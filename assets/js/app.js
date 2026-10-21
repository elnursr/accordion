import Accordion from './accordion/index.js'

import { AccordionItem } from './components/AccordionItem.js';

import { wolfensteins, mortal_kombats } from './data/data.js';

const wolfenstein = new Accordion({
    mode: 'toggle',
    wrapper: '.wolfenstein',
    options: {
          border: {
            isBorderColor: true,
            borderColor: '#c62017'
        },
        colors: {
            head: {
                expanded: '#c62017'
            }
        }
    }
});

wolfenstein.fillUI({
    accordionItem: AccordionItem,
    accordionDataItems: wolfensteins
});

const mortal_kombat = new Accordion({
    mode: 'switch',
    wrapper: '.mortal-kombat',
    options: {
        border: {
            isBorderColor: true,
            borderColor: '#db8e19'
        },
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