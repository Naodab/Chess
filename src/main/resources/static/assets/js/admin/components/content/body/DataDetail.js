import { connect } from "../../../store.js";
import html from "../../../core.js";
import DataChart from "./DetailChart.js";
import DataTable from "./DataTable.js";

function DataDetail({ detail, activeItem }) {
    return html`
        <div class="data__detail closure">
            <div class="detail__toggle ${detail.activeDetail === 'table' && 'active'}">
                <div class="toggle__transform">
                    ${ detail.activeDetail === 'chart' && DataChart({ chart: detail.chart }) }
                    ${ detail.activeDetail === 'table' && DataTable({ table: detail.table, activeItem }) }
                </div>
            </div>
        </div>
    `;
}

export default connect()(DataDetail);