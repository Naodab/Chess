import { connect } from "../../store.js";
import html from "../../core.js";
import ChangePasswordModal from "./ChangePasswordModal.js";
import Notify from "./Notify.js";

function Modal({ modal }) {
    return html`
        <div class="modal closure">
            <i class="fa-solid fa-xmark btn-close" onclick="dispatch('closeModal')"></i>
            ${ modal.activeModal === "changePassword" && ChangePasswordModal(modal[modal.activeModal]) }
            ${ modal.activeModal === "notify" && Notify(modal[modal.activeModal]) }
        </div>
    `;
}

export default connect()(Modal);