import { connect } from "../../../store.js";
import html from "../../../core.js";
import ActivityItem from "./ActivityItem.js";

function ActivityList({ activity }) {
    return html`
        <div class="activity-list closure ${activity.active && "active"}">
            ${activity.list.map((item, index) => ActivityItem({ item, index }))}
        </div>
    `;
}

export default connect()(ActivityList);