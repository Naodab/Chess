import { connect } from "../../store.js";
import html from "../../core.js";
import NavbarOption from "./NavbarOption.js";

function Navbar({ navbar }) {
    return html`
        <nav class="navbar closure">
            <div class="options">
                <div class="icon" 
                     style="background: url('../assets/img/icon.jpg') no-repeat center center / cover">
                </div>

                <div class="navbar__option">
                    ${navbar.list.map((option, index) => 
                        NavbarOption({option, index, activeIndex: navbar.activeIndex}))}
                </div>
            </div>

            <div class="navbar__footer">
                @Copyright PBL4 Chess web
            </div>
        </nav>
    `;
}

export default connect()(Navbar);