import { connect } from "../../store.js";
import html from "../../core.js";

function Notify(notify) {
    return html`
        <h1 class="form__title">Thông báo</h1>
        <div id="change-password-modal">
            <h2 style="font-size: 16px; color: var(--text-color);">${ notify.message }</h2>
            <div class="form-submit">
                <input
                        type="submit"
                        id="submit"
                        class="btn-submit"
                        onclick= "dispatch('closeModal')"
                        value="Đóng"
                >
            </div>
        </div>
    `;
}

export default connect()(Notify);