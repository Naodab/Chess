import { connect } from "../../../store.js";
import html from "../../../core.js";
import ActivityList from "./ActivityList.js";

function ContentHeader({ navbar, avatar }) {
    return html`
        <div class="content__header">
            <h1 class="content__title">${ navbar.list[navbar.activeIndex].name }</h1>
            <div class="header__avatar"
                style="background: url('${avatar}') no-repeat center center / cover;"
                onclick="dispatch('openActivityList')">
                ${ActivityList()}
            </div>
        </div>
    `;
}

export default connect()(ContentHeader);