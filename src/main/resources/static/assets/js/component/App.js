import html from "../core.js";
import { connect } from '../store.js';
import Header from "./Header.js";
import TodoList from "./TodoList.js";
import Footer from "./Footer.js";
import EndApp from "./EndApp.js";

function App({ todos }) {
    return html`
        <section class="todoapp">
            ${Header()}
            ${todos.length > 0 && TodoList()}
            ${Footer()}
        </section>
        ${EndApp()}
    `;
}

export default connect()(App);