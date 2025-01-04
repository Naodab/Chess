import { connect } from "../../store.js";
import html from "../../core.js";

function PersonalPage({user}) {
    return html`
        <h1 class="form__title">Thông tin cá nhân</h1>
        <div class="main-info">
            <img src="${user.avatar}" alt="avatar" class="icon info__avatar info-item">
            <h2 class="info__username info-item">${user.username}</h2>
            <h4 class="info__email info-item">${user.email}</h4>
            <h3 class="info__elo info-item">${user.elo}</h3>
            <div class="info__numbers info-item">
                <div class="number-item closure closure--first">
                    <div class="number__title">THẮNG</div>
                    ${user.winNumber}
                </div>
                <div class="number-item closure closure--second">
                    <div class="number__title">HÒA</div>
                    ${user.drawNumber}
                </div>
                <div class="number-item closure closure--third end">
                    <div class="number__title">THUA</div>
                    ${user.battleNumber - user.winNumber - user.drawNumber}
                </div>
            </div>
        </div>
<!--        <div class="achievements-container info-item">-->
<!--            -->
<!--        </div>-->
        <div class="info__match">
            <div class="transfer-to-match transfer-to-match--pink" 
                 onclick="dispatch('banUser')">
                ${(user.active && "Cấm") || "Bỏ cấm"}
            </div>
        </div>
    `;
}

export default connect()(PersonalPage);