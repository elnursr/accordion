export function AccordionItem(
    {
        index,
        setBorder,
        title, icon, description,
        defaults: {
            classNames: { item: itemClass, head: headClass, title: titleClass, icon: iconClass, body: bodyClass, description: descriptionClass }
        }
    }
) {
    return (
        `
            <li class="${itemClass}" data-accordion-item="accItem" data-accordion-index="${index}" style="border:${setBorder}">
                <div class="${headClass}" data-accordion-head="accHead">
                    <h1 class="${titleClass}" data-accordion-title="accTitle">${title}</h1>
                    <span class="${iconClass}" data-accordion-icon="accIcon">
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