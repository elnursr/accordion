export function AccordionItem({ title, icon, description }) {
    return (
        `
            <li class="accordion__item">
                <div class="accordion__head">
                    <h1 class="accordion__title">${title}</h1>
                    <span class="accordion__icon">
                        <svg viewBox="0 0 24 24">
                            <use href="assets/media/svg/icons.svg#icon-${icon}"></use>
                        </svg>
                    </span>
                </div>
                <div class="accordion__body" data-expanded="false">
                    <p class="accordion__description">${description}</p>
                </div>
            </li>
        `
    )
}