import html from "../core.js";
import { connect } from '../store.js';
import TodoItem from "./TodoItem.js";

function TodoList({ todos, filter, filters }) {
    return html`
        <section class="main">
            <input
                id="toggle-all"
                class="toggle-all"
                type="checkbox"
                ${todos.some(filters.active) && 'checked'}
                onchange="dispatch('toggleAll')"
            >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.filter(filters[filter]).map((todo, index) => TodoItem({todo, index}))}
            </ul>
        </section>
    `;
}

export default connect()(TodoList);