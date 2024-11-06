import { connect } from "../../store.js";
import html from "../../core.js";

function ErrorMessage({ message }) {
    return html`
        <div class="error-message">${ message }</div>
    `;
}

export default connect()(ErrorMessage);