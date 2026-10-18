export default function Accordion({
    mode = 'switch',
    wrapper = '',
    options = {},
} = {}) {

    let _wrapper = null;

    // get set accessor in javascript
    Object.defineProperty(this, 'wrapper', {
        get() {
            return _wrapper;
        },
        set(value) {
            if (typeof value === 'string' && value.trim() !== '') {
                _wrapper = document.querySelector(value);
            }
            else {
                _wrapper = value;
            }
            if (!_wrapper) {
                console.log(`accordion ${value} not found!`);
            }
        },
        enumerable: true,
        configurable: true
    });

    this.mode = mode;
    this.state = {};
    this.activeIndex = null;
    this.wrapper = wrapper;

    this.defaults = {
        colors: {
            head: {
                collapsed: 'transparent',
                expanded: '#000000'
            },
            title: {
                collapsed: '#000000',
                expanded: '#ffffff'
            },
            icon: {
                collapsed: '#000000',
                expanded: '#ffffff'
            }
        },
        attributes: {
            isExpanded: false,
            item: 'accordion-item',
            head: 'accordion-head',
            title: 'accordion-title',
            icon: 'accordion-icon',
            body: 'accordion-body',
            description: 'accordion-description',
            color: 'accordion-color',
        },
        classNames: {
            item: 'accordion__item',
            head: 'accordion__head',
            title: 'accordion__title',
            icon: 'accordion__icon',
            body: 'accordion__body',
            description: 'accordion__description',
        }
    };

    this.options = {
        colors: Object.assign({}, this.defaults.colors, options.colors),
        attributes: Object.assign({}, this.defaults.attributes, options.attributes),
        classNames: Object.assign({}, this.defaults.classNames, options.classNames)
    };

    if (this.wrapper) {
        this.init();
    }
}

Accordion.prototype.init = function () {
    this.dispatchAction();
}

Accordion.prototype.dispatchAction = function () {

    this.wrapper.addEventListener('click', function (e) {

        const itemElement = this.getItemElements(e);

        if (!itemElement) return;

        if (this.mode === 'toggle') {
            this.initializeToggle(itemElement);
        } else {
            this.initializeSwitch(itemElement);
        }
    }.bind(this));
}

Accordion.prototype.setColor = function (items) {

    if (!items) return null;

    items.forEach((item) => {

        const { element, elementType, styleType, isExpanded } = item;

        if (!this.options.colors) {
            this.options.colors = {};
        }

        this.options.colors[elementType] = Object.assign({}, this.defaults.colors[elementType], this.options.colors?.[elementType]);

        const configColor = this.options.colors?.[elementType];

        if (!configColor) return null;

        element.style[styleType] = isExpanded ? configColor.expanded : configColor.collapsed;

    });
}

Accordion.prototype.getItemElements = function (event) {

    const headElement = event.target.closest(`.${this.options.classNames.head}`);

    if (!headElement) return null;

    const itemElement = headElement.closest(`[data-${this.options.attributes.item}]`);

    if (!itemElement) return null;

    return {
        item: itemElement,
        head: headElement,
        title: itemElement.querySelector(`[data-${this.options.attributes.title}]`),
        icon: itemElement.querySelector(`[data-${this.options.attributes.icon}]`),
        body: itemElement.querySelector(`[data-${this.options.attributes.body}]`)
    };
}

Accordion.prototype.initializeToggle = function (accordions) {

    const clickedIndex = Number(accordions.item.dataset.accordionIndex);

    if (this.activeIndex !== null && this.activeIndex !== clickedIndex) {

        this.getItemElement({
            activeIndex: this.activeIndex,
            updateItemUI: this.updateItemUI.bind(this)
        });
    }

    this.updateItemUI({ accordions, itemState: this.state });

    this.activeIndex = this.state[clickedIndex] ? clickedIndex : null;
}

Accordion.prototype.initializeSwitch = function (accordions) {
    this.updateItemUI({ accordions, itemState: this.state });
}

Accordion.prototype.setIconDegree = function ({ element, isExpanded } = {}) {
    if (!element) return;
    element.style.transform = isExpanded ? 'rotate(-225deg)' : 'rotate(0deg)';
}

Accordion.prototype.getItemElement = function ({ activeIndex, updateItemUI }) {

    const element = document.querySelector(`[data-accordion-index="${activeIndex}"]`);

    if (element) {
        const oldAccordions = {
            item: element,
            head: element.querySelector(`[data-${this.options.attributes.head}]`),
            title: element.querySelector(`[data-${this.options.attributes.title}]`),
            icon: element.querySelector(`[data-${this.options.attributes.icon}]`),
            body: element.querySelector(`[data-${this.options.attributes.body}]`)
        };

        // updateItemUI parameter is callback function here
        updateItemUI({ accordions: oldAccordions, itemState: this.state });
    }
}

Accordion.prototype.setHeightElement = function ({ element, isExpanded } = {}) {
    if (!element) return null;
    element.style.height = isExpanded ? `${element.scrollHeight}px` : '0px';
}

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem } = {}) {

    if (!this.wrapper || !Array.isArray(accordionDataItems) || typeof accordionItem !== 'function') {
        return null;
    }

    let index = 0;
    let renderedHTML = '';

    for (let i = 0; i < accordionDataItems.length; i++) {

        let { title, icon, description } = accordionDataItems[i];

        this.state[i] = this.options.attributes.isExpanded;

        index = i;

        renderedHTML += accordionItem({ title, icon, description, defaults:this.defaults, index });
    }

    this.wrapper.innerHTML = renderedHTML;
}

Accordion.prototype.updateItemUI = function ({ accordions: { item, head, title, icon, body }, itemState } = {}) {

    const clickedIndex = Number(item.dataset.accordionIndex);

    itemState[clickedIndex] = !itemState[clickedIndex];

    const isExpanded = itemState[clickedIndex];

    const colorTargets = [
        {
            element: head,
            elementType: 'head',
            styleType: 'backgroundColor',
            isExpanded: isExpanded
        },
        {
            element: title,
            elementType: 'title',
            styleType: 'color',
            isExpanded: isExpanded
        },
        {
            element: icon,
            elementType: 'icon',
            styleType: 'color',
            isExpanded: isExpanded
        }
    ];

    this.setColor(colorTargets);

    this.setHeightElement({
        element: body,
        isExpanded: isExpanded
    });

    this.setIconDegree({
        element: icon,
        isExpanded: isExpanded
    });
}