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

Accordion.prototype.setIconDegree = function ({ icon, value = '0' } = {}) {
    if (!icon) return;
    icon.style.transform = `rotate(${value}deg)`;
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
            this.initializeToggle({
                items: itemElements,
                isExpanded: this.wrapper._isExpanded
            });
        } else {
            this.initializeSwitch({
                items: itemElements
            });
        }
    }.bind(this));
}

Accordion.prototype.changeColorStatus = function ({ element, collapsedColor, expandedColor } = {}) {
    if (!element) return;
    if (element.getAttribute(`data-${this.options.attributes.color}`) !== collapsedColor) {
        element.setAttribute(`data-${this.options.attributes.color}`, collapsedColor);
    }
    else {
        element.setAttribute(`data-${this.options.attributes.color}`, expandedColor);
    }
}

Accordion.prototype.setHeightElement = function (element) {
    if (!element) return null;
    element.style.height = `${element.scrollHeight}px`;
}

Accordion.prototype.resetHeightElement = function (element) {
    if (!element) return null;
    element.style.height = '0px';
}

Accordion.prototype.resetHeightElements = function (bodyElements) {
    for (let i = 0; i < bodyElements.length; i++) {
        bodyElements[i].style.height = '0px';
    }
}

Accordion.prototype.setBackgroundColor = function (element) {
    if (!element) return null;
    const backgroundColor = element.getAttribute(`data-${this.options.attributes.color}`);
    if (backgroundColor) {
        element.style.backgroundColor = backgroundColor;
    }
}

Accordion.prototype.addActiveClass = function ({ element, className }) {
    element.classList.add(className);
}

Accordion.prototype.removeActiveClass = function ({ element, activeClass }) {
    element.classList.remove(activeClass);
}

Accordion.prototype.removeActiveClasses = function ({ elements, activeClass }) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(activeClass)) {
            elements[i].classList.remove(activeClass);
        }
    }
}

Accordion.prototype.initializeToggle = function ({ head, title, icon, body }) {

    const headElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.head}]`),
        titleElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.title}]`),
        iconElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.icon}]`),
        bodyElements = this.wrapper.querySelectorAll(`[data-${this.options.attributes.body}]`);

    this.resetHeightElements(bodyElements);


    for (let i = 0; i < headElements.length; i++) {

        headElements[i].setAttribute(`data-${this.options.attributes.color}`, '');
        titleElements[i].setAttribute(`data-${this.options.attributes.color}`, '');
        iconElements[i].setAttribute(`data-${this.options.attributes.color}`, '');

        this.changeColorStatus({
            element: headElements[i],
            collapsedColor: this.options.colors.head.collapsed,
            expandedColor: this.options.colors.head.expanded
        });
        this.changeColorStatus({
            element: titleElements[i],
            collapsedColor: this.options.colors.title.collapsed,
            expandedColor: this.options.colors.title.expanded
        });

        this.changeColorStatus({
            element: iconElements[i],
            collapsedColor: this.options.colors.icon.collapsed,
            expandedColor: this.options.colors.icon.expanded
        });

        this.setIconDegree({
            icon: iconElements[i]
        });

        this.setBackgroundColor(headElements[i]);
        this.setColor(titleElements[i]);
        this.setColor(iconElements[i]);
    }

    this.changeColorStatus({
        element: head,
        collapsedColor: this.options.colors.head.collapsed,
        expandedColor: this.options.colors.head.expanded
    });

    this.changeColorStatus({
        element: title,
        collapsedColor: this.options.colors.title.collapsed,
        expandedColor: this.options.colors.title.expanded
    });

    this.changeColorStatus({
        element: icon,
        collapsedColor: this.options.colors.icon.collapsed,
        expandedColor: this.options.colors.icon.expanded
    });

    this.setIconDegree({
        icon,
        value: '-225'
    });

    this.setBackgroundColor(head);

    this.setColor(title);

    this.setColor(icon);

    this.setHeightElement(body);
}

Accordion.prototype.setColor = function ({ element, type, isExpanded } = {}) {
    if (!element) return null;

    const configColor = this.options.colors?.[type];

    if (!configColor) return null;

    element.style.color = isExpanded ? configColor.expanded : configColor.collapsed;
}

Accordion.prototype.initializeSwitch = function ({ items: { item, head, title, icon, body } } = {}) {

    this.state[item.dataset.accordionIndex] = !this.state[item.dataset.accordionIndex];

    this.changeColorStatus({
        element: head,
        collapsedColor: this.options.colors.head.collapsed,
        expandedColor: this.options.colors.head.expanded
    });

    this.changeColorStatus({
        element: title,
        collapsedColor: this.options.colors.title.collapsed,
        expandedColor: this.options.colors.title.expanded
    });

    this.changeColorStatus({
        element: icon,
        collapsedColor: this.options.colors.icon.collapsed,
        expandedColor: this.options.colors.icon.expanded
    });

    this.setBackgroundColor(head);

    this.setColor({
        element: title,
        type: 'title',
        isExpanded: this.state[item.dataset.accordionIndex]
    });

    this.setColor({
        element: icon,
        type: 'icon',
        isExpanded: this.state[item.dataset.accordionIndex]
    });

    if (this.state[item.dataset.accordionIndex]) {

        this.setIconDegree({
            icon,
            value: '-225'
        });

        this.setHeightElement(body);
    }
    else {

        this.setIconDegree({ icon });
        this.resetHeightElement(body);
    }
}