import { connect } from "../../../store.js";
import html from "../../../core.js";
import SortField from "./SortField.js";

function FunctionSort({ sortFields, activeSort, activeSortType }) {
    return html`
        <div class="function__sort">
            <h3 class="function__title">Sắp xếp</h3>
            <select name="sort__field" class="selection"
                    onchange="dispatch('changeFieldSort', this.value)"
                >
                ${sortFields.map((sortField) => {
                    return SortField({ sortField, activeSort })
                })}
            </select>
            <div class="sort__type-container">
                <div class="sort-group" onclick="dispatch('changeSortType', 'ASC')">
                    <input type="radio" id="sort--up" name="sort__type"
                        class="sort__type-item" value="ASC"
                        ${ activeSortType === "ASC" && "checked" }
                    >
                    <label for="sort--up">
                        <i class="fa-solid fa-up-long"></i>
                    </label>
                </div>
                <div class="sort-group" onclick="dispatch('changeSortType', 'DESC')">
                    <input type="radio" id="sort--down" name="sort__type"
                           class="sort__type-item" value="DESC" 
                           ${ activeSortType === "DESC" && "checked" }
                    >
                    <label for="sort--down">
                        <i class="fa-solid fa-down-long"></i>
                    </label>
                </div>
                <div class="sort-group" onclick="dispatch('changeSortType', '')">
                    <input type="radio" id="sort--none" name="sort__type"
                           class="sort__type-item" value=""
                           ${ activeSortType === "" && "checked" }
                    >
                    <label for="sort--none">
                        Không
                    </label>
                </div>
            </div>
        </div>
    `;
}

export default connect()(FunctionSort);