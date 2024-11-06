import { connect } from "../../../store.js";
import html from "../../../core.js";

// TODO: dispatch action
function DataItem({ item, index, activeIndex }) {
    return html`
        <div class="data-item closure ${ item.color } 
                ${ index === activeIndex && 'active' }"
            onclick="dispatch()">
            <div class="data-item__content">
                <div class="data-item__title">${ item.title }</div>
                <div class="data-item__number">${ item.quantity }</div>
                <div class="data-item__description">
                    ${ item.description }
                </div>
            </div>
            <div class="data-item__icon">
                <i class="${ item.icon }"></i>
            </div>
        </div>
    `;
}

export default connect()(DataItem);