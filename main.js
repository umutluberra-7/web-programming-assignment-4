// Getting  references to the DOM elements we need
const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");
// TaskManager holds the current state of all tasks
const taskManager = new TaskManager();

function renderTasks() {
  // Clear the container before re-rendering
  while (taskList.firstChild) {   // Clear the container before re-rendering so tasks are not duplicated
    taskList.removeChild(taskList.firstChild);
  }

  taskManager.tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (task.completed) {  // Add the "completed" class so CSS can show the line-through style
      taskDiv.classList.add("completed");
    }

    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;
    
// Renders the task list from TaskManager state
    
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";      
    toggleBtn.addEventListener("click", () => {    // Toggle creates a new Task object instead of changing the old one
      taskManager.toggleTask(task.id);
      renderTasks();
    });

    const deleteBtn = document.createElement("button");   // Remove the task immutably, then redraw the list
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
    const json = JSON.stringify(rawTasks); // Convert to JSON and back, as required by the assignment
    const parsedTasks = JSON.parse(json);

    const tasks = parsedTasks.map(  // Turn plain objects into Task instances
      (item) => new Task(item.id, item.title, item.completed)
    );

    taskManager.setTasks(tasks);
    renderTasks();
    statusMessage.textContent = "";
  } catch (error) {  // Show the error message to the user if fetching fails
    statusMessage.textContent = "Failed to load tasks: " + error.message;
  } finally {
    loadTasksBtn.disabled = false;
  }
}

loadTasksBtn.addEventListener("click", loadTasks);
