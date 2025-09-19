document.addEventListener("DOMContentLoaded", () => {
  // === Notas ===
  const notesContainer = document.getElementById("postItsContainer");
  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  const renderNotas = () => {
    notesContainer.innerHTML = "";
    if (notas.length === 0) {
      notesContainer.innerHTML = "<p>No tienes notas guardadas aún ✍️</p>";
      return;
    }

    notas.forEach((nota, index) => {
      const div = document.createElement("div");
      div.classList.add("post-it");
      div.textContent = nota;

      // Botón borrar
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => {
        notas.splice(index, 1);
        localStorage.setItem("notas", JSON.stringify(notas));
        renderNotas();
      });

      div.appendChild(delBtn);
      notesContainer.appendChild(div);
    });
  };

  renderNotas();

  // === Tareas ===
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
