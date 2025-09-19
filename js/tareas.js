document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  const renderTareas = () => {
    taskList.innerHTML = "";
    if (tareas.length === 0) {
      taskList.innerHTML = "<p>No tienes tareas guardadas aún 📝</p>";
      return;
    }

    tareas.forEach((tarea, index) => {
      const li = document.createElement("li");
      li.classList.add("task-item");

      const span = document.createElement("span");
      span.textContent = tarea.texto;
      if (tarea.completada) {
        span.classList.add("has-text-grey-light");
      }

      span.addEventListener("click", () => {
        tareas[index].completada = !tareas[index].completada;
        localStorage.setItem("tareas", JSON.stringify(tareas));
        renderTareas();
      });

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => {
        tareas.splice(index, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        renderTareas();
      });

      li.appendChild(span);
      li.appendChild(delBtn);
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
