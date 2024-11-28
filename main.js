const input = document.getElementById("input");
const add_btn = document.getElementById("add_btn");
const list = document.getElementById("list");

loadTasks();

function addTask() {
  const task = input.value.trim();

  if (task) {
    createTaskElement(task);
    input.value = "";
    saveTasks();
  } else {
    alert("please enter a task");
  }
}

function createTaskElement(task) {
  const listItem = document.createElement("li");

  listItem.textContent = task;

  const delete_btn = document.createElement("button");
  delete_btn.className = "delete_btn";
  delete_btn.textContent = "❌";

  listItem.appendChild(delete_btn);
  list.appendChild(listItem);

  delete_btn.addEventListener("click", function () {
    list.removeChild(listItem);
    saveTasks();
  });
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
add_btn.addEventListener("click", addTask);

function saveTasks() {
  let tasks = [];
  list.querySelectorAll("li").forEach(function (item) {
    tasks.push(item.textContent.replace("❌", "").trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    return;
  }

  tasks.forEach(createTaskElement);
}
