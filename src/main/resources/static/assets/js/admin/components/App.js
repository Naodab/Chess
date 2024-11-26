import { connect } from "../store.js";
import html from "../core.js";
import Navbar from "./navbar/Navbar.js";
import ContentContainer from "./content/ContentContainer.js";
import Modal from "./modal/Modal.js";

function App({ modal }) {
    return html`
        <div id="background"></div>
        <div id="coating"></div>
        <div id="overlay" style="z-index: ${ modal.activeModal && '10' || '-100' };">
            ${ modal.activeModal &&  Modal()}
        </div>
        <div id="container">
            ${Navbar()}
            ${ContentContainer()}
        </div>
    `;
}

export default connect()(App);