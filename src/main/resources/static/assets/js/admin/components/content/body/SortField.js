import { connect } from "../../../store.js";
import html from "../../../core.js";

function SortField({ sortField, index }) {
    return html`
        <option value="${sortField.value}"
            onclick="dispatch('changeFieldSort')">
            ${sortField.name}
        </option>
    `;
}

export default connect()(SortField);