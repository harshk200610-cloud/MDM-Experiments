const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  saveAndRender();
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);

    const del = document.createElement("span");
    del.textContent = "✖";
    del.className = "delete";
    del.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
