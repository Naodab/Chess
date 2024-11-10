import { connect } from "../../../store.js";
import html from "../../../core.js";

function SortType({ sortType }) {
    return html`
        <div class="sort-group">
            <input type="radio" id="sort--asc" name="sort__type"
                   class="sort__type-item" value="asc">
            <label for="sort--asc">
                <i class="fa-solid fa-up-long"></i>
            </label>
        </div>
    `;
}

export default connect()(SortType);