const celebrationGifs = [
  "assets/gifs/celebration1.gif",
  "assets/gifs/celebration2.gif",
  "assets/gifs/celebration3.gif",
  "assets/gifs/celebration4.gif",
  "assets/gifs/celebration5.gif",
  "assets/gifs/celebration6.gif",
  "assets/gifs/celebration7.gif",
];

let gifQueue = [];

function shuffleArray(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [array[i], array[j]] =
    [array[j], array[i]];
  }

  return array;
}

let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

const taskList =
  document.getElementById("taskList");

function saveTasks() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function showCelebrationGif() {

  const gif =
    document.getElementById(
      "celebrationGif"
    );

  const gifImg =
    document.getElementById(
      "celebrationGifImg"
    );

  if (gifQueue.length === 0) {

    gifQueue =
      shuffleArray(
        [...celebrationGifs]
      );
  }

  const nextGif =
    gifQueue.pop();

  gifImg.src = nextGif;

  gif.classList.add("show");

  setTimeout(() => {

    gif.classList.remove("show");

  }, 3000);
}

function updateStats() {

  document.getElementById("totalTasks")
    .textContent = tasks.length;

  document.getElementById("completedTasks")
    .textContent =
      tasks.filter(task => task.completed).length;

  document.getElementById("activeTasks")
    .textContent =
      tasks.filter(task => !task.completed).length;

  const completed =
    tasks.filter(task => task.completed).length;

  const percent =
    tasks.length === 0
      ? 0
      : Math.round(
          (completed / tasks.length) * 100
        );

  document.getElementById("progressPercent")
    .textContent = `${percent}%`;

  document.getElementById("progressFill")
    .style.width = `${percent}%`;
}

function renderTasks() {

  taskList.innerHTML = "";

  const search =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

  let filteredTasks =
    tasks.filter(task =>
      task.text
        .toLowerCase()
        .includes(search)
    );

  if (currentFilter === "active") {

    filteredTasks =
      filteredTasks.filter(
        task => !task.completed
      );
  }

  if (currentFilter === "completed") {

    filteredTasks =
      filteredTasks.filter(
        task => task.completed
      );
  }

  const sort =
    document.getElementById("sortSelect").value;

  if (sort === "completed") {

    filteredTasks.sort(
      (a, b) => b.completed - a.completed
    );
  }

  if (sort === "priority") {

    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1
    };

    filteredTasks.sort(
      (a, b) =>
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
    );
  }

  if (filteredTasks.length === 0) {

    taskList.innerHTML = `
      <div class="empty-state">

        <h2>Задач пока нет</h2>

        <p>
          Добавьте первую задачу 🚀
        </p>

      </div>
    `;

    updateStats();

    return;
  }

  filteredTasks.forEach((task) => {

    const card =
      document.createElement("div");

    card.className = `
      task-card
      ${task.completed ? "completed" : ""}
    `;

    card.innerHTML = `
      <div class="task-info">

        <h3>${task.text}</h3>

        <div class="task-meta">

          <span class="tag category">
            ${task.category}
          </span>

          <span class="tag ${task.priority}">
            ${
              task.priority === "high"
                ? "Высокий"
                : task.priority === "medium"
                ? "Средний"
                : "Низкий"
            }
          </span>

          <span class="tag">
            ${task.date || "Без даты"}
          </span>

        </div>

      </div>

      <div class="task-actions">

        <button onclick="toggleTask(${task.id})">
          ✓
        </button>

        <button onclick="editTask(${task.id})">
          ✏
        </button>

        <button onclick="deleteTask(${task.id})">
          🗑
        </button>

      </div>
    `;

    taskList.appendChild(card);
  });

  updateStats();
}

function addTask() {

  const text =
    document.getElementById("taskInput")
    .value
    .trim();

  const category =
    document.getElementById("categoryInput")
    .value;

  const priority =
    document.getElementById("priorityInput")
    .value;

  const date =
    document.getElementById("dateInput")
    .value;

  if (!text) {

    alert("Введите задачу");

    return;
  }

  tasks.push({

  id: Date.now(),

  text,
  category,
  priority,
  date,

  completed: false
});

  saveTasks();

  renderTasks();

  document.getElementById("taskInput")
    .value = "";

  showToast("Задача добавлена");
}

function deleteTask(id) {

  const confirmDelete =
    confirm("Удалить задачу?");

  if (!confirmDelete) return;

  tasks = tasks.filter(
    task => task.id !== id
  );

  saveTasks();

  renderTasks();

  showToast("Задача удалена");
}

function toggleTask(id) {

  const task =
    tasks.find(
      task => task.id === id
    );

  if (!task) return;

  task.completed = !task.completed;

  if (task.completed) {

    showCelebrationGif();
  }

  saveTasks();

  renderTasks();

  showToast("Статус обновлён");
}

function editTask(id) {

  const task =
    tasks.find(
      task => task.id === id
    );

  if (!task) return;

  const newText = prompt(
    "Редактировать задачу:",
    task.text
  );

  if (!newText) return;

  task.text = newText;

  saveTasks();

  renderTasks();

  showToast("Задача обновлена");
}

function setFilter(filter) {

  currentFilter = filter;

  const buttons =
    document.querySelectorAll(
      ".filter-btn"
    );

  buttons.forEach(button => {

    button.classList.remove(
      "active"
    );

    if (
      button.dataset.filter === filter
    ) {

      button.classList.add(
        "active"
      );
    }
  });

  renderTasks();
}

document
  .getElementById("searchInput")
  .addEventListener(
    "input",
    renderTasks
  );

document
  .getElementById("sortSelect")
  .addEventListener(
    "change",
    renderTasks
  );

const themeToggle =
  document.getElementById("themeToggle");

if (
  localStorage.getItem("theme") === "dark"
) {
  document.body.classList.add("dark");
}

themeToggle.addEventListener(
  "click",
  () => {

    document.body.classList.toggle("dark");

    if (
      document.body.classList.contains("dark")
    ) {

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }
);

renderTasks();