import { connect } from "../../../store.js";
import html from "../../../core.js";

function ActivityItem({ item, index }) {
    return html`
        <a href="#" class="activity-item" onclick="dispatch('executeActivity', ${ index })">
            <i class="${ item.icon } activity__icon"></i>
            <span>${ item.name }</span>
        </a>
    `;
}

export default connect()(ActivityItem);