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

    // actualizar arrastrables
    updateDraggables(notesContainer, ".post-it");
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

    // actualizar arrastrables
    updateDraggables(tasksContainer, ".task-item");
  };

  renderTareas();

  // === Calendario ===
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    function renderCalendar() {
      const daysInMonth = 30; // de momento fijo
      for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("calendar-day");
        day.dataset.day = i;
        day.innerHTML = `<strong>${i}</strong>`;
        day.addEventListener("dragover", e => e.preventDefault());
        day.addEventListener("drop", handleDrop);
        calendarEl.appendChild(day);
      }
    }

    function handleDrop(e) {
      e.preventDefault();
      const noteId = e.dataTransfer.getData("text/plain");
      const draggedEl = document.getElementById(noteId);
      if (draggedEl) {
        const clone = draggedEl.cloneNode(true);
        clone.classList.add("calendar-note");
        clone.removeAttribute("id");
        this.appendChild(clone);
      }
    }

    renderCalendar();
  }

  // === Funciones drag & drop genéricas ===
  function updateDraggables(container, selector) {
    container.querySelectorAll(selector).forEach((el, idx) => {
      el.setAttribute("draggable", "true");
      if (!el.id) el.id = `${selector.replace(".", "")}-${idx}`;
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", el.id);
      });
    });
  }
});
