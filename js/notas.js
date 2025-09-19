// Lógica notas rápidas
document.addEventListener('DOMContentLoaded', () => {
  const noteArea = document.getElementById("noteArea");
  const saveBtn = document.getElementById("saveBtn");

  noteArea.value = localStorage.getItem("notaRapida") || "";

  saveBtn.addEventListener("click", () => {
    localStorage.setItem("notaRapida", noteArea.value);
    alert("Nota guardada ✔️");
  });
});