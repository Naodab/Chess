import { connect } from "../../../store.js";
import html from "../../../core.js";
import SortField from "./SortField.js";

function FunctionSort({ sortFields }) {
    return html`
        <div class="function__sort">
            <h3 class="function__title">Sắp xếp</h3>
            <select name="sort__field" class="selection">
                ${sortFields.map((sortField, index) => {
                    return SortField({sortField, index})
                })}
            </select>
            <div class="sort__type-container">
                <div class="sort-group" onclick="dispatch('changeSortType', 'ASC')">
                    <input type="radio" id="sort--up" name="sort__type"
                        class="sort__type-item" value="ASC">
                    <label for="sort--up">
                        <i class="fa-solid fa-up-long"></i>
                    </label>
                </div>
                <div class="sort-group" onclick="dispatch('changeSortType', 'DESC')">
                    <input type="radio" id="sort--down" name="sort__type"
                        class="sort__type-item" value="DESC">
                    <label for="sort--down">
                        <i class="fa-solid fa-down-long"></i>
                    </label>
                </div>
                <div class="sort-group" onclick="dispatch('changeSortType', '')">
                    <input type="radio" id="sort--none" name="sort__type"
                        class="sort__type-item" value="" selected="true" checked>
                    <label for="sort--none">
                        Không
                    </label>
                </div>
            </div>
        </div>
    `;
}

export default connect()(FunctionSort);