
## File Organization

- `index.html` – page structure (heading, `#loadTasksBtn`, `#statusMessage`, `#taskList`) and script loading order.
- `styles.css` – minimal styling, including the `.completed` line-through style.
- `taskManager.js` – `Task` class (read-only `id` via `Object.defineProperty`, `toggle()` returns a new object) and `TaskManager` class (immutable `setTasks`, `addTask`, `removeTask`, `toggleTask`).
- `api.js` – `fetchTasks()` returns a Promise that resolves with raw data after 1500ms (`setTimeout`).
- `main.js` – connects everything: loads tasks with `async/await`, JSON stringify/parse, creates `Task` instances, renders the DOM, handles Toggle/Delete events, and error handling with `try/catch`.

## Challenges I Faced

- Keeping state immutable: using spread, `filter` and `map` instead of `push`/`splice`.
- Making `id` read-only with `Object.defineProperty` and noticing that `toggle()` has to create a new `Task`.
- Re-rendering the list correctly after each event.
- Sharing classes between multiple script files without modules.
