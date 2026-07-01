export default function Accordion({
    elements = {
        element: '' | undefined,
        elementItems: [] | undefined,
        headerElements: [] | undefined,
        bodyElements: [] | undefined,
        iconElements: [] | undefined,
        titleElements: [] | undefined,
    } | undefined,
    icons = [] | undefined,
    titles = [] | undefined,
    descriptions = [] | undefined,
    classNames = { iconClassName: '', titleClassName: '' } | undefined,
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
    let renderHTML = '';
    for (let i = 0; i < accordionDataItems.length; i++) {
        let { icon, title, description } = accordionDataItems[i];
        renderHTML += accordionItem({ icon, title, description });
    }
    this.elements.element.innerHTML = renderHTML;
}

Accordion.prototype.toggle = function () {
    for (let i = 0; i < this.elements.headerElements.length; i++) {

        this.collapsedHeight = this.elements.elementItems[i].scrollHeight;

        this.elements.headerElements[i].addEventListener('click', function (e) {
            e.preventDefault();

            this.updateViewVersionTwo({
                itemElement: this.elements.elementItems[i],
                bodyElement: this.elements.bodyElements[i],
                iconElement: this.elements.iconElements[i],
                titleElement: this.elements.titleElements[i],
                collapsedHeight: this.collapsedHeight
            });

        }.bind(this));
    }
}

Accordion.prototype.switch = function () {
    for (let i = 0; i < this.elements.headerElements.length; i++) {
        this.elements.headerElements[i].addEventListener('click', function (e) {
            e.preventDefault();
            this.resetHeightElements(this.elements.bodyElements);
            this.resetClassNames({
                elements: this.elements.iconElements,
                className: this.classNames.iconClassName
            });
            this.resetClassNames({
                elements: this.elements.titleElements,
                className: this.classNames.titleClassName
            });
            this.addClassName({
                element: this.elements.iconElements[i],
                className: this.classNames.iconClassName
            });
            this.addClassName({
                element: this.elements.titleElements[i],
                className: this.classNames.titleClassName
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

Accordion.prototype.addClassName = function ({ element, className }) {
    element.classList.add(className);
}

Accordion.prototype.resetClassName = function ({ element, className }) {
    element.classList.remove(className);
}

Accordion.prototype.resetClassNames = function ({ elements, className }) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className);
    }
}

Accordion.prototype.updateView = function ({ bodyElement, iconElement, titleElement }) {

    let isExpanded = bodyElement.dataset.expanded === 'true';

    if (!isExpanded) {
        bodyElement.dataset.expanded = 'true'
        this.setHeightElement(bodyElement);

        this.addClassName({
            element: iconElement,
            className: this.classNames.iconClassName
        });
        this.addClassName({
            element: titleElement,
            className: this.classNames.titleClassName
        });
    }
    else {
        bodyElement.dataset.expanded = 'false'
        this.resetHeightElement(bodyElement);

        this.resetClassName({
            element: iconElement,
            className: this.classNames.iconClassName
        });
        this.resetClassName({
            element: titleElement,
            className: this.classNames.titleClassName
        });
    }
}

Accordion.prototype.updateViewVersionTwo = function ({ itemElement, bodyElement, iconElement, titleElement, collapsedHeight }) {

    this.addClassName({
        element: iconElement,
        className: this.classNames.iconClassName
    });
    this.addClassName({
        element: titleElement,
        className: this.classNames.titleClassName
    });

    this.setHeightElement(bodyElement);
    this.expandedHeight = itemElement.scrollHeight;

    if (collapsedHeight !== this.expandedHeight) {
        this.resetHeightElement(bodyElement);
        this.resetClassName({
            element: iconElement,
            className: this.classNames.iconClassName
        });
        this.resetClassName({
            element: titleElement,
            className: this.classNames.titleClassName
        });
    }
}