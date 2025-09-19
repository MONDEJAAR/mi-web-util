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
      div.id = `nota-${index}`;
      div.setAttribute("draggable", "true");

      div.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", div.id);
      });

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
      li.id = `tarea-${index}`;
      li.setAttribute("draggable", "true");

      li.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", li.id);
      });

      const span = document.createElement("span");
      span.textContent = tarea.texto;
      if (tarea.completada) span.classList.add("has-text-grey-light");

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
      tasksContainer.appendChild(li);
    });
  };

  renderTareas();

  // === Calendario ===
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
   function renderCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0 = enero
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  calendarEl.innerHTML = "";

  // Contenedor del mes
  const monthHeader = document.createElement("div");
  monthHeader.style.textAlign = "center"; // centrar el nombre
  monthHeader.style.marginBottom = "10px"; // separación
  monthHeader.innerHTML = `<h3 class="title is-5">${monthNames[month]} ${year}</h3>`;
  calendarEl.appendChild(monthHeader);

  // Contenedor grid
  const grid = document.createElement("div");
  grid.classList.add("calendar-grid");

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement("div");
    day.classList.add("calendar-day");
    day.dataset.day = i;
    day.innerHTML = `<strong>${i}</strong>`;
    day.addEventListener("dragover", e => e.preventDefault());
    day.addEventListener("drop", handleDrop);
    grid.appendChild(day);
  }

  calendarEl.appendChild(grid);
}


    function handleDrop(e) {
      e.preventDefault();
      const elId = e.dataTransfer.getData("text/plain");
      const draggedEl = document.getElementById(elId);

      if (draggedEl) {
        const clone = draggedEl.cloneNode(true);
        clone.classList.add("calendar-note");
        clone.removeAttribute("id");

        const oldDelBtn = clone.querySelector(".delete-btn");
        if (oldDelBtn) oldDelBtn.remove();

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.classList.add("delete-btn");
        delBtn.style.position = "absolute";
        delBtn.style.top = "2px";
        delBtn.style.right = "4px";
        delBtn.addEventListener("click", () => clone.remove());

        clone.style.position = "relative";
        clone.appendChild(delBtn);

        this.appendChild(clone);
      }
    }

    renderCalendar();
  }
});
