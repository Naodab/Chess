import { connect } from "../../store.js";
import html from "../../core.js";
import ContentHeader from "./header/ContentHeader.js";
import ContentBody from "./body/ContentBody.js";

function ContentContainer() {
    return html`
        <div class="content-container">
            ${ContentHeader()}
            ${ContentBody()}
        </div>
    `;
}

export default connect()(ContentContainer);