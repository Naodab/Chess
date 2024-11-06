import { connect } from "../../../store.js";
import html from "../../../core.js";

function DataChart({ chart }) {
    return html`
        <div class="detail__chart toggle-item">
            <h1 class="detail__title">Biểu đồ</h1>
            <div class="detail-container">
                <canvas id="${ chart.id }"></canvas>
            </div>
            <h2 class="chart__name">${ chart.name }</h2>
            <div class="transfer" onclick="dispatch('changeDetail')">Danh sách chi tiết</div>
        </div>
    `;
}

export default connect()(DataChart);