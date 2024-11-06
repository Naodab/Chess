const ADMIN_STORAGE_KEY = "ADMIN_STORAGE";

export default {
    get() {
        return JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY)) || [];
    },
    set(todos) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(todos));
    }
}