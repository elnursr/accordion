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

Accordion.prototype.selectElement = function (element) {
    return document.querySelector(element);
}

Accordion.prototype.dispatchAction = function () {

    this.wrapper.addEventListener('click', function (e) {
        const itemElements = this.getItemElements(e);

        if (!itemElements) return;

        if (this.mode === 'toggle') {
            this.initializeToggle(itemElements)
        } else {
            this.initializeSwitch(itemElements)
        }
    }.bind(this));
}

Accordion.prototype.changeColorStatus = function ({ element, collapsedColor, expandedColor }) {
    if (!element) return;
    if (element.getAttribute(`data-${this.options.attributes.color}`) !== collapsedColor) {
        element.setAttribute(`data-${this.options.attributes.color}`, collapsedColor);
    }
    else {
        element.setAttribute(`data-${this.options.attributes.color}`, expandedColor);
    }
}

Accordion.prototype.setIconDegree = function ({ icon, value }) {
    icon.style.transform = `rotate(${value}deg)`;
}

Accordion.prototype.getItemElements = function (event) {

    const headElement = event.target.closest(`.${this.options.classNames.head}`);

    if (!headElement) return undefined;

    const itemElement = headElement.closest(`[data-${this.options.attributes.item}]`);

    if (!itemElement) return undefined;

    return {
        item: itemElement,
        head: headElement,
        title: itemElement.querySelector(`[data-${this.options.attributes.title}]`),
        icon: itemElement.querySelector(`[data-${this.options.attributes.icon}]`),
        body: itemElement.querySelector(`[data-${this.options.attributes.body}]`)
    };
}

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem }) {

    let renderedHTML = '';

    const defaults = this.options;

    for (let i = 0; i < accordionDataItems.length; i++) {
        let { title, icon, description } = accordionDataItems[i];
        renderedHTML += accordionItem({ title, icon, description, defaults });
    }

    if (!this.wrapper) return;

    this.wrapper.innerHTML = renderedHTML;
}


Accordion.prototype.checkDOM = function (domElement) {
    if (!domElement) return;
}

Accordion.prototype.getCollapsedHeight = function (elementHeight) {
    this.collapsedHeight = elementHeight.scrollHeight;
    return this.collapsedHeight;
}

Accordion.prototype.setHeightElement = function (bodyElement) {
    bodyElement.style.height = bodyElement.scrollHeight + 'px';
}

Accordion.prototype.resetHeightElement = function (bodyElement) {
    bodyElement.style.height = '0px';
}

Accordion.prototype.resetHeightElements = function (bodyElements) {
    for (let i = 0; i < bodyElements.length; i++) {
        bodyElements[i].style.height = '0px';
    }
}

Accordion.prototype.setColor = function (element) {
    element.style.color = element.getAttribute(`data-${this.options.attributes.color}`);
}

Accordion.prototype.setBackgroundColor = function (element) {
    element.style.backgroundColor = element.getAttribute(`data-${this.options.attributes.color}`);
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

    const headElements = document.querySelectorAll(`[data-${this.options.attributes.head}]`),
        titleElements = document.querySelectorAll(`[data-${this.options.attributes.title}]`),
        iconElements = document.querySelectorAll(`[data-${this.options.attributes.icon}]`),
        bodyElements = document.querySelectorAll(`[data-${this.options.attributes.body}]`);

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
            icon: iconElements[i],
            value: '0'
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

Accordion.prototype.initializeSwitch = function ({ head, title, icon, body }) {

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

    this.setColor(title);

    this.setColor(icon);

    const isExpanded = body.dataset.accordionExpanded === 'true';

    if (!isExpanded) {

        body.dataset.accordionExpanded = 'true';

        this.setIconDegree({
            icon,
            value: '-225'
        });

        this.setHeightElement(body);
    }
    else {

        this.setIconDegree({
            icon,
            value: '0'
        });

        body.dataset.accordionExpanded = 'false';

        this.resetHeightElement(body);
    }
}