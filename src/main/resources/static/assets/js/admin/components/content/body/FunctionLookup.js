import { connect } from "../../../store.js";
import html from "../../../core.js";
import SortField from "./SortField.js";

function FunctionLookup({ table }) {
    return html`
        <div class="function__lookup">
            <div class="lookup__search-bar">
                <input type="text" id="search" name="search"
                       placeholder="Nhập username hoặc email"
                       value = "${table.lookupValue}"
                       onkeyup="dispatch('lookupRecord', this.value.trim())"
                >
                <span class="lookup__icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
            </div>
        </div>
    `;
}

export default connect()(FunctionLookup);