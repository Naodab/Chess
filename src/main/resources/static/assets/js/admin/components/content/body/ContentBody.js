import { connect } from "../../../store.js";
import html from "../../../core.js";
import DataList from "./DataList.js";
import DataDetail from "./DataDetail.js";

function ContentBody({ content }) {
    return html`
        <div class="content__body">
            <div id = "${content[content.activeItem].id}" class="content__body-item">
                ${
                    DataList({ 
                        dataList: content[content.activeItem].dataList,
                        activeIndex: content[content.activeItem].activeIndex,
                    })
                }
                ${
                    DataDetail({
                        detail: content[content.activeItem].detail,
                        activeItem: content.activeItem
                    })
                }
            </div>
        </div>
    `;
}

export default connect()(ContentBody);