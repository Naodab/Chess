import storage from "./util/storage.js"

const init = {
	todos: storage.get(),
	filter: 'all',
	filters: {
		all: () => true,
		active: todo => !todo.completed,
		completed: todo => todo.completed
	},
	editIndex: null
}

const actions = {
	add: ({ todos }, title) => {
		todos.push({ title, completed: false });
		storage.set(todos);
	},
	toggle: ({ todos }, index) => {
		todos[index].completed = !todos[index].completed;
		storage.set(todos);
	},
	toggleAll(state) {
		state.todos.forEach(todo => todo.completed = true);
		storage.set(state.todos);
	},
	destroy(state, index) {
		state.todos.splice(index, 1);
		storage.set(state.todos);
	},
	changeFilter(state, type) {
		state.filter = type;
	},
	clearCompleted(state) {
		state.todos = state.todos.filter(state.filters.active);
		storage.set(state.todos);
	},
	startEdit(state, index) {
		state.editIndex = index;
	},
	endEdit(state, title) {
		if (state.editIndex !== null) {
			if (title) {
				state.todos[state.editIndex].title = title;
				storage.set(state.todos);
			} else {
				this.destroy(state, state.editIndex);
			}
			state.editIndex = null;
		}
	}
}

export default function reducer(state = init, action, args) {
	actions[action] && actions[action](state, ...args);
	return state;
}