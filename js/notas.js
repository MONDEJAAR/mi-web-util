document.addEventListener("DOMContentLoaded", () => {
  const noteArea = document.getElementById("noteArea");
  const saveBtn = document.getElementById("saveBtn");
  const notesList = document.getElementById("notesList");

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  const renderNotas = () => {
    notesList.innerHTML = "";
    if (notas.length === 0) {
      notesList.innerHTML = "<p>No tienes notas guardadas aún ✍️</p>";
      return;
    }

    notas.forEach((nota, index) => {
      const div = document.createElement("div");
      div.classList.add("post-it");
      div.textContent = nota;

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => {
        notas.splice(index, 1);
        localStorage.setItem("notas", JSON.stringify(notas));
        renderNotas();
      });

      div.appendChild(delBtn);
      notesList.appendChild(div);
    });
  };

  saveBtn.addEventListener("click", () => {
    if (noteArea.value.trim() !== "") {
      notas.push(noteArea.value);
      localStorage.setItem("notas", JSON.stringify(notas));
      noteArea.value = "";
      renderNotas();
    }
  });

  renderNotas();
});
