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
    widthItems = '' | undefined,
    expandedHeight = '' | undefined,
    collapsedHeight = '' | undefined
}) {
    this.elements = elements;
    this.icons = icons;
    this.title = titles;
    this.descriptions = descriptions;
    this.classNames = classNames;
    this.widthItems = widthItems;
    this.expandedHeight = expandedHeight;
    this.collapsedHeight = collapsedHeight;
    if (this.elements.elementItems.length > 0 && this.widthItems) {
        for (let i = 0; i < this.elements.elementItems.length; i++) {
            this.elements.elementItems[i].style.width = this.widthItems;
        }
    }
}

Accordion.prototype.fillUI = function ({ accordionDataItems, accordionItem }) {
    let emptyHTML = '';
    for (let i = 0; i < accordionDataItems.length; i++) {
        let { icon, title, description } = accordionDataItems[i];
        emptyHTML += accordionItem({ icon, title, description });
    }
    this.element.innerHTML = emptyHTML;
}

Accordion.prototype.toggle = function () {
    for (let i = 0; i < this.elements.headerElements.length; i++) {
        this.collapsedHeight = this.elements.elementItems[i].scrollHeight;
        this.elements.headerElements[i].addEventListener('click', function (e) {
            e.preventDefault();
            this.addClassName({
                element: this.elements.iconElements[i],
                className: this.classNames.iconClassName
            });
            this.addClassName({
                element: this.elements.titleElements[i],
                className: this.classNames.titleClassName
            });
            this.setHeightElement(this.elements.bodyElements[i]);
            // this section must be modified
            this.expandedHeight = this.elements.elementItems[i].scrollHeight;
            console.log(this.collapsedHeight);
            console.log(this.expandedHeight);
            if (this.collapsedHeight !== this.expandedHeight) {
                this.elements.bodyElements[i].style.height = '0px';
                this.elements.iconElements[i].classList.remove(this.classNames.iconClassName);
                this.elements.titleElements[i].classList.remove(this.classNames.titleClassName);
            }
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

Accordion.prototype.setHeightElement = function (element) {
    element.style.height = element.scrollHeight + 'px';
}

Accordion.prototype.resetHeightElements = function (elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.height = '0px';
    }
}

Accordion.prototype.addClassName = function ({ element, className }) {
    element.classList.add(className);
}

Accordion.prototype.resetClassNames = function ({ elements, className }) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(className);
    }
}