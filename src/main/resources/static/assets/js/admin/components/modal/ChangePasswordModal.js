import { connect } from "../../store.js";
import html from "../../core.js";
import FormGroup from "./FormGroup.js";
import ErrorMessage from "./ErrorMessage.js";

function ChangePasswordModal(changePassword) {
    return html`
        <h1 class="form__title">Đổi mật khẩu</h1>
        ${changePassword.errorMessage && ErrorMessage({message: changePassword.errorMessage})}
        <div id="change-password-modal">
            ${ changePassword.groups.map((group, index) =>
                    FormGroup({ group, index,
                        iconCanSee: changePassword.icon.canSee,
                        iconCantSee: changePassword.icon.cantSee
                    })
            )}
            <div class="form-submit">
                <input
                    type="submit"
                    id="submit"
                    class="btn-submit"
                    onclick= "dispatch('submitChangePassword')"
                >
            </div>
        </div>
    `;
}

export default connect()(ChangePasswordModal);