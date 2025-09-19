// Mostrar notas y tareas en index
document.addEventListener("DOMContentLoaded", () => {
  // === Mostrar Notas ===
  const notesContainer = document.getElementById("postItsContainer");
  const notas = JSON.parse(localStorage.getItem("notas")) || [];

  if (notas.length > 0) {
    notas.forEach((nota) => {
      const div = document.createElement("div");
      div.classList.add("post-it");
      div.textContent = nota;
      notesContainer.appendChild(div);
    });
  } else {
    notesContainer.innerHTML = "<p>No tienes notas guardadas aún ✍️</p>";
  }

  // === Mostrar Tareas ===
  const tasksContainer = document.getElementById("taskListHome");
  let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  const renderTareas = () => {
    tasksContainer.innerHTML = "";
    if (tareas.length === 0) {
      tasksContainer.innerHTML = "<p>No tienes tareas guardadas aún 📝</p>";
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

      // Botón borrar
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
      tasksContainer.appendChild(li);
    });
  };

  renderTareas();
});
