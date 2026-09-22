export function AccordionItem({ title, icon, description }) {
    return (
        `
            <li class="accordion__item" data-item="accItem">
                <div class="accordion__head" data-head="accHead">
                    <h1 class="accordion__title" data-title="accTitle">${title}</h1>
                    <span class="accordion__icon" data-icon="accIcon">
                        <svg viewBox="0 0 24 24">
                            <use href="assets/media/svg/icons.svg#icon-${icon}"></use>
                        </svg>
                    </span>
                </div>
                <div class="accordion__body" data-expanded="false" data-body="accBody">
                    <p class="accordion__description" data-description="accDescription">${description}</p>
                </div>
            </li>
        `
    )
}