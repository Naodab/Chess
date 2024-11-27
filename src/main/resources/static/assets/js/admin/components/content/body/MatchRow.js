import { connect } from "../../../store.js";
import html from "../../../core.js";

const color = [
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 0.2)',
]

function MatchRow({ row, index }) {
    return html`
        <tr style="background-color: ${ index % 2 === 0 && color[0] || color[1]}"
            onclick="dispatch('openPersonalPage', ${index} )">
            <td>${row.id}</td>
            <td class="center">${row.time} phút</td>
            <td class="center">${row.createdAt.substring(0, 10)}</td>
            <td class="center">${row.whiteUsername}</td>
            <td class="center">${row.blackUsername}</td>
            <td class="center">${row.winner}</td>
        </tr>
    `;
}

export default connect()(MatchRow);