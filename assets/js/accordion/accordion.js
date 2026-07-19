export default function Accordion({
    elements = {
        element: '' | undefined,
        elementItems: [] | undefined,
        headElements: [] | undefined,
        titleElements: [] | undefined,
        iconElements: [] | undefined,
        bodyElements: [] | undefined,
    } | undefined,
    titles = [] | undefined,
    icons = [] | undefined,
    descriptions = [] | undefined,
    classNames = { headClassName: '', titleClassName: '', iconClassName: '' } | undefined,
    mode = '' || 'switch',
    widthItems = '' | undefined,
    expandedHeight = '' | undefined,
    collapsedHeight = '' | undefined
}) {
    this.elements = elements;
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
    this.elements.element.innerHTML = renderedHTML;

    return this.elements.element.children;
}

Accordion.prototype.toggle = function () {

    for (let i = 0; i < this.elements.headElements.length; i++) {

        this.collapsedHeight = this.getCollapsedHeight(this.elements.elementItems[i]);

        this.elements.headElements[i].addEventListener('click', function (e) {
            e.preventDefault();

            this.initalizeToggle({
                headElement: this.elements.headElements[i],
                titleElement: this.elements.titleElements[i],
                iconElement: this.elements.iconElements[i],
                bodyElement: this.elements.bodyElements[i]
            });

        }.bind(this));
    }
}

Accordion.prototype.getCollapsedHeight = function (elementHeight) {
    this.collapsedHeight = elementHeight.scrollHeight;
    return this.collapsedHeight;
}

Accordion.prototype.switch = function () {
    for (let i = 0; i < this.elements.headElements.length; i++) {
        this.elements.headElements[i].addEventListener('click', function (e) {
            e.preventDefault();

            this.initalizeSwitch({
                headElement: this.elements.headElements[i],
                titleElement: this.elements.titleElements[i],
                iconElement: this.elements.iconElements[i],
                bodyElement: this.elements.bodyElements[i]
            });

        }.bind(this));
    }
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

Accordion.prototype.removeActiveClass = function ({ element, className }) {
    element.classList.remove(className);
}

Accordion.prototype.removeActiveClasses = function ({ elements, activeClass }) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(activeClass)) {
            elements[i].classList.remove(activeClass);
        }
    }
}

Accordion.prototype.initalizeToggle = function ({ headElement, titleElement, iconElement, bodyElement }) {
    this.removeActiveClasses({
        elements: this.elements.headElements,
        activeClass: this.classNames.headClassName
    });
    this.removeActiveClasses({
        elements: this.elements.titleElements,
        activeClass: this.classNames.titleClassName
    });
    this.removeActiveClasses({
        elements: this.elements.iconElements,
        activeClass: this.classNames.iconClassName
    });

    this.resetHeightElements(this.elements.bodyElements);

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
}

Accordion.prototype.initalizeSwitch = function ({ headElement, titleElement, iconElement, bodyElement }) {

    let isExpanded = bodyElement.dataset.expanded === 'true';

    if (!isExpanded) {
        bodyElement.dataset.expanded = 'true';

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
    }
    else {
        bodyElement.dataset.expanded = 'false';

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