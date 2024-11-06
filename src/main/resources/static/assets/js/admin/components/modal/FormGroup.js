import { connect } from "../../store.js";
import html from "../../core.js";

function FormGroup({ group, index, iconCanSee, iconCantSee }) {
    return html`
        <div class="form-group">
            <label>${ group.label }</label>
            <div class="password-container">
                <input type="${ (group.canSee && 'text') || 'password'}"
                    id="${ group.name }"
                    name="${ group.name }"
                    placeholder="${ group.placeHolder }"
                    value='${ group.value }'>
                <i class="${ group.canSee && iconCanSee || iconCantSee }"
                    onclick="dispatch('turnOnSee', ${ index })">
                </i>
            </div>
        </div>
    `;
}

export default connect()(FormGroup);