// Lógica To-Do list
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById("addTaskBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = taskInput.value;
      li.className = "box";
      li.addEventListener("click", () => li.classList.toggle("has-text-grey-light"));
      taskList.appendChild(li);
      taskInput.value = "";
    }
  });
});