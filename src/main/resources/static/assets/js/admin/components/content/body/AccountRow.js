import { connect } from "../../../store.js";
import html from "../../../core.js";

const color = [
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 0.4)',
]

function AccountRow({ row, index }) {
    return html`
        <tr style="background-color: ${ index % 2 === 0 && color[0] || color[1]}">
            <td>${row.id}</td>
            <td>${row.username}</td>
            <td>${row.email}</td>
            <td class="contain-percent">
                <div class="percent" style="width: ${row.percent}%;">
                    ${row.percent}
                </div>
            </td>
            <td class="center">${row.elo}</td>
            <td class="center">${row.battleNumber}</td>
        </tr>
    `;
}

export default connect()(AccountRow);