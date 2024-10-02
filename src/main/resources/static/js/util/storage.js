const TODOLIST_STORAGE_KEY = "STORAGE_KEY";

export default {
    get() {
        return JSON.parse(localStorage.getItem(TODOLIST_STORAGE_KEY)) || [];
    },
    set(todos) {
        localStorage.setItem(TODOLIST_STORAGE_KEY, JSON.stringify(todos));
    }
}