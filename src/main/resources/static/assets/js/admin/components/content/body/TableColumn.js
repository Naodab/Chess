import { connect } from "../../../store.js";
import html from "../../../core.js";

function TableColumn({ column }) {
    return html`
        <th style="width: ${column.width};" 
            class="${column.first && 'th__first'} 
                   ${column.last && 'th__last'} 
                   ${column.center && 'center'}">
            ${column.title}
        </th>
    `;
}

export default connect()(TableColumn);