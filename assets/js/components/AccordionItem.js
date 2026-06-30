export function AccordionItem({ icon, title, description }) {
    return (
        `
            <li class="accordion__item">
                <div class="accordion__head">
                    <h1 class="accordion__title">${title}</h1>
                    <span class="accordion__icon">${icon}</span>
                </div>
                <div class="accordion__body">
                    <p class="accordion__description">${description}</p>
                </div>
            </li>
        `
    )
}