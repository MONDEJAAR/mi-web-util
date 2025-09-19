// Manejo de varias notas
document.addEventListener("DOMContentLoaded", () => {
  const noteArea = document.getElementById("noteArea");
  const saveBtn = document.getElementById("saveBtn");
  const notesList = document.getElementById("notesList");

  let notas = JSON.parse(localStorage.getItem("notas")) || [];

  const renderNotas = () => {
    notesList.innerHTML = "";
    notas.forEach((nota) => {
      const li = document.createElement("li");
      li.textContent = nota;
      notesList.appendChild(li);
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