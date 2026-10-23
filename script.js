


const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("count");
const congrats = document.getElementById("congrats");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = task.title;

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.done ? "Completed ✓" : "Complete";
    completeBtn.onclick = () => toggle(index);

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "🗑️";
    del.onclick = () => remove(index);

    li.append(text, completeBtn, del);
    list.appendChild(li);
  });

  const left = tasks.filter(t => !t.done).length;
  count.textContent = tasks.length
    ? `${left} of ${tasks.length} tasks left`
    : "No tasks yet";


  const allDone = tasks.length > 0 && left === 0;
  congrats.classList.toggle("show", allDone);
}


function addTask() {
  const title = input.value.trim();
  if (title === "") return;             
  tasks.push({ title: title, done: false });
  input.value = "";
  save();
  render();
}


function toggle(index) {
  tasks[index].done = !tasks[index].done;
  save();
  render();
}

function remove(index) {
  tasks.splice(index, 1);
  save();
  render();
}


addBtn.onclick = addTask;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

render(); // first run
