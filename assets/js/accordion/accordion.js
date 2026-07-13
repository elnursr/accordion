export default function Accordion({
    elements = {
        element: '' | undefined,
        elementItems: [] | undefined,
        headElements: [] | undefined,
        bodyElements: [] | undefined,
        iconElements: [] | undefined,
        titleElements: [] | undefined,
    } | undefined,
    icons = [] | undefined,
    titles = [] | undefined,
    descriptions = [] | undefined,
    classNames = { headClassName: '', titleClassName: '', iconClassName: '' } | undefined,
    mode = '' || 'switch',
    widthItems = '' | undefined,
    expandedHeight = '' | undefined,
    collapsedHeight = '' | undefined
}) {
    this.elements = elements;
    this.icons = icons;
    this.title = titles;
    this.descriptions = descriptions;
    this.classNames = classNames;
    this.mode = mode;
    this.widthItems = widthItems;
    this.expandedHeight = expandedHeight;
    this.collapsedHeight = collapsedHeight;
    if (this.elements.elementItems.length > 0 && this.widthItems) {
        for (let i = 0; i < this.elements.elementItems.length; i++) {
            this.elements.elementItems[i].style.width = this.widthItems;
        }
    }
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
        let { icon, title, description } = accordionDataItems[i];
        renderHTML += accordionItem({ icon, title, description });
    }
    this.elements.element.innerHTML = renderedHTML;
}

Accordion.prototype.toggle = function () {
    for (let i = 0; i < this.elements.headElements.length; i++) {

        this.collapsedHeight = this.elements.elementItems[i].scrollHeight;

        this.elements.headElements[i].addEventListener('click', function (e) {
            e.preventDefault();

            this.updateViewVersionTwo({
                itemElement: this.elements.elementItems[i],
                headerElement: this.elements.headElements[i],
                titleElement: this.elements.titleElements[i],
                iconElement: this.elements.iconElements[i],
                bodyElement: this.elements.bodyElements[i],
                collapsedHeight: this.collapsedHeight
            });

        }.bind(this));
    }
}

Accordion.prototype.switch = function () {
    for (let i = 0; i < this.elements.headElements.length; i++) {
        this.elements.headElements[i].addEventListener('click', function (e) {
            e.preventDefault();

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
                element: this.elements.headElements[i],
                className: this.classNames.headClassName
            });
            this.addActiveClass({
                element: this.elements.titleElements[i],
                className: this.classNames.titleClassName
            });
            this.addActiveClass({
                element: this.elements.iconElements[i],
                className: this.classNames.iconClassName
            });
            this.setHeightElement(this.elements.bodyElements[i]);

        }.bind(this))
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

Accordion.prototype.updateView = function ({ titleElement, iconElement, bodyElement }) {

    let isExpanded = bodyElement.dataset.expanded === 'true';

    if (!isExpanded) {
        bodyElement.dataset.expanded = 'true';
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

Accordion.prototype.updateViewVersionTwo = function ({ itemElement, headerElement, titleElement, iconElement, bodyElement, collapsedHeight }) {

    this.addActiveClass({
        element: headerElement,
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
            element: headerElement,
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