export default function Accordion({
    element = '' | undefined,
    titles = [] | undefined,
    icons = [] | undefined,
    descriptions = [] | undefined,
    classNames = { headClassName: '', titleClassName: '', iconClassName: '' } | undefined,
    mode = '' || 'switch',
    widthItems = '' | undefined,
    expandedHeight = '' | undefined,
    collapsedHeight = '' | undefined
}) {
    this.element = element;
    this.title = titles;
    this.icons = icons;
    this.descriptions = descriptions;
    this.classNames = classNames;
    this.mode = mode;
    this.widthItems = widthItems;
    this.expandedHeight = expandedHeight;
    this.collapsedHeight = collapsedHeight;

    // if (this.elements.elementItems.length === 0) {
    //     console.log("items not found");
    // }
}

Accordion.prototype.init = function () {
    if (this.mode === 'toggle') {
        this.toggle();
    }
    else {
        this.switch();
    }
}

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem }) {
    let renderedHTML = '';

    for (let i = 0; i < accordionDataItems.length; i++) {
        let { title, icon, description } = accordionDataItems[i];
        renderedHTML += accordionItem({ title, icon, description });
    }

    this.element.innerHTML = renderedHTML;
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

Accordion.prototype.toggle = function () {

    this.element.addEventListener('click', function (e) {

        const headElement = e.target.closest('.accordion__head');

        if (!headElement) return;

        const itemELements = this.getItemElements(headElement);

        this.initalizeToggle(itemELements);

    }.bind(this));
}

Accordion.prototype.switch = function () {

    this.element.addEventListener('click', function (e) {

        const headElement = e.target.closest('.accordion__head');

        if (!headElement) return;

        const itemELements = this.getItemElements(headElement);

        this.initalizeSwitch(itemELements);

    }.bind(this));
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

    let headElements = document.querySelectorAll('[data-head]'),
        titleElements = document.querySelectorAll('[data-title]'),
        iconElements = document.querySelectorAll('[data-icon]'),
        bodyElements = document.querySelectorAll('[data-body');

    this.removeActiveClasses({
        elements: headElements,
        activeClass: this.classNames.headClassName
    });

    this.removeActiveClasses({
        elements: titleElements,
        activeClass: this.classNames.titleClassName
    });

    this.removeActiveClasses({
        elements: iconElements,
        activeClass: this.classNames.iconClassName
    });

    this.resetHeightElements(bodyElements);

    this.addActiveClass({
        element: head,
        className: this.classNames.headClassName
    });

    this.addActiveClass({
        element: title,
        className: this.classNames.titleClassName
    });

    this.addActiveClass({
        element: icon,
        className: this.classNames.iconClassName
    });

    this.setHeightElement(body);
}

Accordion.prototype.initalizeSwitch = function ({ head, title, icon, body }) {

    let isExpanded = body.dataset.expanded === 'true';

    if (!isExpanded) {

        body.dataset.expanded = 'true';

        this.addActiveClass({
            element: head,
            className: this.classNames.headClassName
        });

        this.addActiveClass({
            element: title,
            className: this.classNames.titleClassName
        });

        this.addActiveClass({
            element: icon,
            className: this.classNames.iconClassName
        });

        this.setHeightElement(body);
    }
    else {

        body.dataset.expanded = 'false';

        this.removeActiveClass({
            element: head,
            activeClass: this.classNames.headClassName
        });

        this.removeActiveClass({
            element: title,
            activeClass: this.classNames.titleClassName
        });

        this.removeActiveClass({
            element: icon,
            activeClass: this.classNames.iconClassName
        });

        this.resetHeightElement(body);
    }
}

Accordion.prototype.updateViewVersionTwo = function ({ itemElement, headElement, titleElement, iconElement, bodyElement, collapsedHeight }) {

    this.addActiveClass({
        element: headElement,
        className: this.classNames.headClassName
    });
    this.addActiveClass({
        element: titleElement,
        className: this.classNames.titleClassName
    });
    this.addActiveClass({
        element: iconElement,
        className: this.classNames.iconClassName
    });

    this.setHeightElement(bodyElement);

    this.expandedHeight = itemElement.scrollHeight;

    if (collapsedHeight !== this.expandedHeight) {
        this.removeActiveClass({
            element: headElement,
            className: this.classNames.headClassName
        });
        this.removeActiveClass({
            element: titleElement,
            className: this.classNames.titleClassName
        });
        this.removeActiveClass({
            element: iconElement,
            className: this.classNames.iconClassName
        });
        this.resetHeightElement(bodyElement);
    }
}