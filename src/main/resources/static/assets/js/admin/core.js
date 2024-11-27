import { createChart } from "./reducer.js";

export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('');
}

export function createStore(reducer) {
    let state = reducer();
    const roots = new Map();

    function render() {
        for (const [root, component] of roots) {
            const output = component();
            root.innerHTML = output;
        }
    }

    return {
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect(selector = state => state) {
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args));
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            if (state.canRender !== false) {
                render();
                const search = document.querySelector("#search");
                if (search) {
                    search.focus();
                    search.selectionStart = search.selectionEnd = search.value.length;
                }
                let canvas = document.querySelector(`#account__chart`);
                if (canvas) {
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    createChart(ctx, state, state.chartRerender);
                    state.chartRerender = false;
                }
                canvas = document.querySelector(`#match__chart`);
                if (canvas) {
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    createChart(ctx, state, state.chartRerender,
                        "rgba(250, 168, 206, 1)",
                        "rgba(250, 168, 206, 0.4)",);
                    state.chartRerender = false;
                }
            } else {
                state.canRender = true;
            }
        }
    }
}