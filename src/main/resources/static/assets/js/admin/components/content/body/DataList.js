import { connect } from "../../../store.js";
import html from "../../../core.js";
import DataItem from "./DataItem.js";

function DataList({ dataList, activeIndex }) {
    return html`
        <div class="data-list">
            ${ dataList.map((item, index) => DataItem({item, index, activeIndex})) }
        </div>
    `;
}

export default connect()(DataList);