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
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  if (tareas.length > 0) {
    tareas.forEach((tarea) => {
      const li = document.createElement("li");
      li.textContent = tarea.texto;
      if (tarea.completada) {
        li.classList.add("has-text-grey-light");
      }
      tasksContainer.appendChild(li);
    });
  } else {
    tasksContainer.innerHTML = "<p>No tienes tareas guardadas aún 📝</p>";
  }
});
