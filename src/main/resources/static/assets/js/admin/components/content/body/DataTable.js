import { connect } from "../../../store.js";
import html from "../../../core.js";
import TableColumn from "./TableColumn.js";
import AccountRow from "./AccountRow.js";
import FunctionSort from "./FunctionSort.js";

function DataTable({ table, activeItem }) {
    return html`
        <div class="detail__table toggle-item">
            <div class="detail__header">
                <div class="back-button" onclick="dispatch('changeDetail')">
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
                <h1 class="detail__title">Danh sách</h1>
            </div>
            <div class="table__function">
                ${FunctionSort({ sortFields: table.sortFields})}
            </div>
            <div class="detail-container">
                <table id="${ table.id }" class="table">
                    <tr>
                        ${ table.columns.map(column => TableColumn({ column })) }
                    </tr>
                    ${
                        activeItem === "account"
                        && table.rows.map((row, index) => {
                            return AccountRow({row, index});
                        })
                    }
                </table>
            </div>
            <div class="detail__pages">
                ${table.detailPages.map((page, index) => html`
                    <span class="page ${index === table.activePage && 'active'}"
                        onclick="dispatch('changePage', ${index})">
                        ${page}
                    </span>
                `)}
            </div>
        </div>
    `;
}

export default connect()(DataTable);