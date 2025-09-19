// Manejo de varias tareas
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  const renderTareas = () => {
    taskList.innerHTML = "";
    tareas.forEach((tarea, index) => {
      const li = document.createElement("li");
      li.textContent = tarea.texto;

      if (tarea.completada) {
        li.classList.add("has-text-grey-light");
      }

      li.addEventListener("click", () => {
        tareas[index].completada = !tareas[index].completada;
        localStorage.setItem("tareas", JSON.stringify(tareas));
        renderTareas();
      });

      taskList.appendChild(li);
    });
  };

  addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
      tareas.push({ texto: taskInput.value, completada: false });
      localStorage.setItem("tareas", JSON.stringify(tareas));
      taskInput.value = "";
      renderTareas();
    }
  });

  renderTareas();
});
