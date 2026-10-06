export default function Accordion({
    mode = 'switch',
    wrapper = '',
    options = {},
} = {}) {

    let _wrapper = null;

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
                console.log(`Accordion ${value} not found!`);
            }
        },
        configurable: true,
        enumerable: true
    });

    this.mode = mode;
    this.state = {};
    this.wrapper = wrapper;

    this.defaults = {

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
        },

        colors: {
            head: {
                collapsed: 'transparent',
                expanded: '#db8e19'
            },
            title: {
                collapsed: '#000000',
                expanded: '#ffffff'
            },
            icon: {
                collapsed: '#000000',
                expanded: '#ffffff'
            }
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

Accordion.prototype.selectElement = function (queryString) {
    if (!this.wrapper || typeof queryString !== 'string') {
        return null;
    }
    return this.wrapper.querySelector(queryString);
}

Accordion.prototype.setIconDegree = function ({ element, value, isExpanded } = {}) {
    if (!element) return;
    element.style.transform = isExpanded ? 'rotate(-225deg)' : 'rotate(0deg)';
}

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem } = {}) {

    if (!this.wrapper || !Array.isArray(accordionDataItems) || typeof accordionItem !== 'function') {
        return null;
    }

    let index = 0;
    let renderedHTML = '';

    const defaults = this.options;

    for (let i = 0; i < accordionDataItems.length; i++) {

        let { title, icon, description } = accordionDataItems[i];

        this.state[i] = this.options.attributes.isExpanded;

        index = i;

        renderedHTML += accordionItem({ title, icon, description, defaults, index });
    }

    this.wrapper.innerHTML = renderedHTML;
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

Accordion.prototype.dispatchAction = function () {

    this.wrapper.addEventListener('click', function (e) {

        const itemElements = this.getItemElements(e);

        if (!itemElements) return;

        if (this.mode === 'toggle') {
            this.initializeToggle(itemElements);
        } else {
            this.initializeSwitch(itemElements);
        }
    }.bind(this));
}

Accordion.prototype.setHeightElement = function ({ element, isExpanded } = {}) {
    if (!element) return null;
    element.style.height = isExpanded ? `${element.scrollHeight}px` : '0px';
}

Accordion.prototype.resetHeightElements = function (bodyElements) {
    for (let i = 0; i < bodyElements.length; i++) {
        bodyElements[i].style.height = '0px';
    }
}

Accordion.prototype.setColor = function (items) {

    if (!items) return null;

    items.forEach((item) => {

        const { element, elementType, styleType, isExpanded } = item;

        const configColor = this.options.colors?.[elementType];

        if (!configColor) return null;

        element.style[styleType] = isExpanded ? configColor.expanded : configColor.collapsed;
    });
}

Accordion.prototype.removeActiveClasses = function ({ elements, activeClass }) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(activeClass)) {
            elements[i].classList.remove(activeClass);
        }
    }
}

Accordion.prototype.initializeToggle = function ({ item, head, title, icon, body }) {

    // const headElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.head}]`),
    //     titleElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.title}]`),
    //     iconElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.icon}]`),
    //     bodyElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.body}]`);

    const itemElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.item}]`);

    for (let i = 0; i < itemElements.length; i++) {
        this.state[itemElements[i].dataset.accordionIndex] = !this.state[itemElements[i].dataset.accordionIndex];
    }

    // this.state[item.dataset.accordionIndex] = !this.state[item.dataset.accordionIndex];

    const colorTargets = [
        {
            element: head,
            elementType: 'head',
            styleType: 'backgroundColor',
            isExpanded: this.state[item.dataset.accordionIndex]
        },
        {
            element: title,
            elementType: 'title',
            styleType: 'color',
            isExpanded: this.state[item.dataset.accordionIndex]
        },
        {
            element: icon,
            elementType: 'icon',
            styleType: 'color',
            isExpanded: this.state[item.dataset.accordionIndex]
        }
    ];

    this.setColor(colorTargets);

    this.setHeightElement({
        element: body,
        isExpanded: this.state[item.dataset.accordionIndex]
    });

    this.setIconDegree({
        element: icon,
        isExpanded: this.state[item.dataset.accordionIndex]
    });
}

Accordion.prototype.initializeSwitch = function () {
    this.updateUI();
}

Accordion.prototype.updateItemUI = function ({ item, head, title, icon, body } = {}) {

    this.state[item.dataset.accordionIndex] = !this.state[item.dataset.accordionIndex];

    const colorTargets = [
        {
            element: head,
            elementType: 'head',
            styleType: 'backgroundColor',
            isExpanded: this.state[item.dataset.accordionIndex]
        },
        {
            element: title,
            elementType: 'title',
            styleType: 'color',
            isExpanded: this.state[item.dataset.accordionIndex]
        },
        {
            element: icon,
            elementType: 'icon',
            styleType: 'color',
            isExpanded: this.state[item.dataset.accordionIndex]
        }
    ];

    this.setColor(colorTargets);

    this.setHeightElement({
        element: body,
        isExpanded: this.state[item.dataset.accordionIndex]
    });

    this.setIconDegree({
        element: icon,
        isExpanded: this.state[item.dataset.accordionIndex]
    });
}