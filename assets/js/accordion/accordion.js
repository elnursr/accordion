export default function Accordion({
    // destructuring
    mode = 'switch',
    wrapper = '',
    options = {},
} = {}) {

    // constructor
    this.mode = mode;
    this.wrapper = typeof wrapper === 'string' ? document.querySelector(wrapper.startsWith('.') ? wrapper : `.${wrapper}`) : wrapper;

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

    this.init();
}

Accordion.prototype.selectElement = function (element) {
    return document.querySelector(element);
}

Accordion.prototype.init = function () {
    if (this.mode === 'toggle') {
        this.toggle();
    }
    else {
        this.switch();
    }
}

Accordion.prototype.toggle = function () {

    this.wrapper.addEventListener('click', function (e) {

        const headElement = e.target.closest(`.${this.options.classNames.head}`);

        if (!headElement) return;

        const itemELements = this.getItemElements(headElement);

        this.initializeToggle(itemELements);

    }.bind(this));
}

Accordion.prototype.switch = function () {

    this.wrapper.addEventListener('click', function (e) {

        const headElement = e.target.closest(`.${this.options.classNames.head}`);

        if (!headElement) return;

        const itemELements = this.getItemElements(headElement);

        this.initializeSwitch(itemELements);

    }.bind(this));
}

Accordion.prototype.changeColorStatus = function ({ element, collapsedColor, expandedColor }) {
    if (element.getAttribute(`data-${this.options.attributes.color}`) !== collapsedColor) {
        element.setAttribute(`data-${this.options.attributes.color}`, collapsedColor);
    }
    else {
        element.setAttribute(`data-${this.options.attributes.color}`, expandedColor);
    }
}

Accordion.prototype.getItemElements = function (headElement) {

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

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem }) {

    let renderedHTML = '';

    const defaults = this.options;

    for (let i = 0; i < accordionDataItems.length; i++) {
        let { title, icon, description } = accordionDataItems[i];
        renderedHTML += accordionItem({ title, icon, description, defaults });
    }

    this.wrapper.innerHTML = renderedHTML;
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

        this.setHeightElement(body);
    }
    else {

        body.dataset.accordionExpanded = 'false';

        this.resetHeightElement(body);
    }
}