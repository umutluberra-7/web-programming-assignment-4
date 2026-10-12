
## File Organization

- `index.html` – page structure (heading, `#loadTasksBtn`, `#statusMessage`, `#taskList`) and script loading order.
- `styles.css` – minimal styling, including the `.completed` line-through style.
- `taskManager.js` – `Task` class (read-only `id` via `Object.defineProperty`, `toggle()` returns a new object) and `TaskManager` class (immutable `setTasks`, `addTask`, `removeTask`, `toggleTask`).
- `api.js` – `fetchTasks()` returns a Promise that resolves with raw data after 1500ms (`setTimeout`).
- `main.js` – connects everything: loads tasks with `async/await`, JSON stringify/parse, creates `Task` instances, renders the DOM, handles Toggle/Delete events, and error handling with `try/catch`.

## Challenges I Faced


The hardest part for me was updating the task list without changing the original array directly. At first, using map and filter was a little confusing, but then I understood that they create a new array.

Another challenging part was async/await. Since the tasks do not come immediately, I needed to show a loading message. I also learned how to use try/catch if an error happens.

On the DOM side, using addEventListener to toggle or delete tasks when buttons are clicked was useful practice for me.
