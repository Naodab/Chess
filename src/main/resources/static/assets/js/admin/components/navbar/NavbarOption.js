import { connect } from "../../store.js";
import html from "../../core.js";

function NavbarOption({option, index, activeIndex}) {
    return html`
        <a class="navbar__button option-icon ${index === activeIndex && 'active'}" 
            onclick="dispatch('changeOption', ${index})">
            <i class="${option.icon} option-icon"></i>
            <span class="option-title">${option.name}</span>
        </a>
    `;
}

export default connect()(NavbarOption);