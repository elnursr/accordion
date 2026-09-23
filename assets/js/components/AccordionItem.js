export function AccordionItem(
    {
        title, icon, description,
        defaults: {
            classNames: { itemClassName, headClassName, titleClassName, iconClassName, bodyClassName, descriptionClassName },
            dataAttributes: { itemData, headData, titleData, iconData, bodyData, descriptionData,
                isExpanded }
        }
    }
) {
    return (
        `
            <li class="${itemClassName}" data-${itemData}="accItem">
                <div class="${headClassName}" data-${headData}="accHead">
                    <h1 class="${titleClassName}" data-${titleData}="accTitle">${title}</h1>
                    <span class="${iconClassName}" data-${iconData}="accIcon">
                        <svg viewBox="0 0 24 24">
                            <use href="assets/media/svg/icons.svg#icon-${icon}"></use>
                        </svg>
                    </span>
                </div>
                <div class="${bodyClassName}" data-expanded="${isExpanded}" data-${bodyData}="accBody">
                    <p class="${descriptionClassName}" data-${descriptionData}="accDescription">${description}</p>
                </div>
            </li>
        `
    )
}