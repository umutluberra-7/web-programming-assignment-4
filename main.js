const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");

const taskManager = new TaskManager();

function renderTasks() {
  // Clear the container before re-rendering
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  taskManager.tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (task.completed) {
      taskDiv.classList.add("completed");
    }

    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.addEventListener("click", () => {
      taskManager.toggleTask(task.id);
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      taskManager.removeTask(task.id);
      renderTasks();
    });

    taskDiv.appendChild(titleSpan);
    taskDiv.appendChild(toggleBtn);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);
  });
}

async function loadTasks() {
  statusMessage.textContent = "Loading tasks...";
  loadTasksBtn.disabled = true;

  try {
    const rawTasks = await fetchTasks();

    // JSON round trip (required by the assignment)
    const json = JSON.stringify(rawTasks);
    const parsedTasks = JSON.parse(json);

    const tasks = parsedTasks.map(
      (item) => new Task(item.id, item.title, item.completed)
    );

    taskManager.setTasks(tasks);
    renderTasks();
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Failed to load tasks: " + error.message;
  } finally {
    loadTasksBtn.disabled = false;
  }
}

loadTasksBtn.addEventListener("click", loadTasks);
