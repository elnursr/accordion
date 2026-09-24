export default function Accordion({
    // destructuring
    mode = 'switch',
    container = '',
    expandedHeight,
    collapsedHeight,
    options = {},
    activeClassName = {}
} = {}) {
    // constructor
    this.container = typeof container === 'string' ? document.querySelector(container.startsWith('.') ? container : `.${container}`) : container;
    this.activeClassName = activeClassName;
    this.mode = mode;
    this.expandedHeight = expandedHeight;
    this.collapsedHeight = collapsedHeight;

    this.defaults = {
        dataAttributes: {
            itemData: 'item',
            headData: 'head',
            headDataColor: 'color',
            headDataColorValue: '#158bd2',
            titleData: 'title',
            iconData: 'icon',
            bodyData: 'body',
            descriptionData: 'description',
            isExpanded: false,
        },
        classNames: {
            itemClassName: 'accordion__item',
            headClassName: 'accordion__head',
            titleClassName: 'accordion__title',
            iconClassName: 'accordion__icon',
            bodyClassName: 'accordion__body',
            descriptionClassName: 'accordion__description',
        },
        activeClassNames: {
            headActiveClassName: 'accordion__head--active',
            titleActiveClassName: 'accordion__title--active',
            iconActiveClassName: 'accordion__icon--active'
        }
    };

    this.options = Object.assign({}, this.defaults, options);

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

    this.container.addEventListener('click', function (e) {

        const headElement = e.target.closest(`.${this.options.classNames.headClassName}`);

        if (!headElement) return;

        const itemELements = this.getItemElements(headElement);

        this.initalizeToggle(itemELements);

    }.bind(this));
}

Accordion.prototype.switch = function () {

    this.container.addEventListener('click', function (e) {

        const headElement = e.target.closest(`.${this.defaults.classNames.headClassName}`);

        if (!headElement) return;

        const itemELements = this.getItemElements(headElement);

        this.initalizeSwitch(itemELements);

    }.bind(this));
}

Accordion.prototype.getItemElements = function (headElement) {
    const itemElement = headElement.closest('[data-item]');

    if (!itemElement) return null;

    return {
        item: itemElement,
        head: headElement,
        title: itemElement.querySelector('[data-title]'),
        icon: itemElement.querySelector('[data-icon]'),
        body: itemElement.querySelector('[data-body]')
    };
}

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem }) {

    let renderedHTML = '';

    const defaults = this.options;

    for (let i = 0; i < accordionDataItems.length; i++) {
        let { title, icon, description } = accordionDataItems[i];
        renderedHTML += accordionItem({ title, icon, description, defaults });
    }

    this.container.innerHTML = renderedHTML;
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

Accordion.prototype.setBackgroundColor = function (element) {
    element.style.backgroundColor = element.dataset.color;
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

Accordion.prototype.initalizeToggle = function ({ head, title, icon, body }) {

    const headElements = document.querySelectorAll('[data-head]'),
        titleElements = document.querySelectorAll('[data-title]'),
        iconElements = document.querySelectorAll('[data-icon]'),
        bodyElements = document.querySelectorAll('[data-body');

    const { activeClassNames: { headActiveClassName, titleActiveClassName, iconActiveClassName } } = this.options;

    this.removeActiveClasses({
        elements: headElements,
        activeClass: headActiveClassName
    });

    this.removeActiveClasses({
        elements: titleElements,
        activeClass: titleActiveClassName
    });

    this.removeActiveClasses({
        elements: iconElements,
        activeClass: iconActiveClassName
    });

    this.resetHeightElements(bodyElements);

    this.addActiveClass({
        element: head,
        className: headActiveClassName
    });

    this.addActiveClass({
        element: title,
        className: titleActiveClassName
    });

    this.addActiveClass({
        element: icon,
        className: iconActiveClassName
    });

    this.setHeightElement(body);
}

Accordion.prototype.initalizeSwitch = function ({ head, title, icon, body }) {

    const { activeClassNames: { headActiveClassName, titleActiveClassName, iconActiveClassName } } = this.options;


    const isExpanded = body.dataset.expanded === 'true';

    if (!isExpanded) {

        body.dataset.expanded = 'true';

        this.setBackgroundColor(head);

        // this.addActiveClass({
        //     element: head,
        //     className: headActiveClassName
        // });

        this.addActiveClass({
            element: title,
            className: titleActiveClassName
        });

        this.addActiveClass({
            element: icon,
            className: iconActiveClassName
        });

        this.setHeightElement(body);
    }
    else {

        body.dataset.expanded = 'false';

        this.removeActiveClass({
            element: head,
            activeClass: headActiveClassName
        });

        this.removeActiveClass({
            element: title,
            activeClass: titleActiveClassName
        });

        this.removeActiveClass({
            element: icon,
            activeClass: iconActiveClassName
        });

        this.resetHeightElement(body);
    }
}

Accordion.prototype.updateViewVersionTwo = function ({ itemElement, headElement, titleElement, iconElement, bodyElement, collapsedHeight }) {

    this.addActiveClass({
        element: headElement,
        className: this.activeClassName.headClassName5
    });
    this.addActiveClass({
        element: titleElement,
        className: this.activeClassName.titleClassName
    });
    this.addActiveClass({
        element: iconElement,
        className: this.activeClassName.iconClassName
    });

    this.setHeightElement(bodyElement);

    this.expandedHeight = itemElement.scrollHeight;

    if (collapsedHeight !== this.expandedHeight) {
        this.removeActiveClass({
            element: headElement,
            className: this.activeClassName.headClassName
        });
        this.removeActiveClass({
            element: titleElement,
            className: this.activeClassName.titleClassName
        });
        this.removeActiveClass({
            element: iconElement,
            className: this.activeClassName.iconClassName
        });
        this.resetHeightElement(bodyElement);
    }
}