import { connect } from "../../../store.js";
import html from "../../../core.js";

function SortField({ sortField, activeSort }) {
    return html`
        <option value="${sortField.value}"
            ${ sortField.value === activeSort && 'selected' }>
            ${sortField.name}
        </option>
    `;
}

export default connect()(SortField);