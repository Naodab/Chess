import html from "../core.js";
import { connect } from '../store.js';

function Footer({ todos, filter, filters }) {
    return html`
        <footer class="footer">
            <span class="todo-count"><strong>
                ${todos.filter(filters[filter]).length}
            </strong> item left</span>
            <ul class="filters">
                ${Object.keys(filters).map(type => html`
                    <li>
                        <a class="${type === filter && 'selected'}" href="#" onclick="dispatch('changeFilter', '${type}')">
                            ${type[0].toUpperCase() + type.slice(1)}
                        </a>
                    </li>
                `)}
            </ul>
            <button class="clear-completed" onclick="dispatch('clearCompleted')">Clear completed</button>
        </footer>
    `;
}

export default connect()(Footer);