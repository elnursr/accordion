export function AccordionItem(
    {
        index,
        title, icon, description,
        defaults: {
            colors: { head: { collapsed: headColor }, title: { collapsed: titleColor }, icon: { collapsed: iconColor } },
            classNames: { item: itemClass, head: headClass, title: titleClass, icon: iconClass, body: bodyClass, description: descriptionClass }
        }
    }
) {
    return (
        `
            <li class="${itemClass}" data-accordion-item="accItem" data-accordion-index="${index}">
                <div class="${headClass}" data-accordion-head="accHead" data-accordion-color="${headColor}">
                    <h1 class="${titleClass}" data-accordion-title="accTitle" data-accordion-color="${titleColor}">${title}</h1>
                    <span class="${iconClass}" data-accordion-icon="accIcon" data-accordion-color="${iconColor}">
                        <svg viewBox="0 0 24 24">
                            <use href="assets/media/svg/icons.svg#icon-${icon}"></use>
                        </svg>
                    </span>
                </div>
                <div class="${bodyClass}" data-accordion-body="accBody">
                    <p class="${descriptionClass}" data-accordion-description="accDescription">${description}</p>
                </div>
            </li>
        `
    )
}