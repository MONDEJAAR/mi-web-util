// Mostrar nota guardada como post-it en index
document.addEventListener("DOMContentLoaded", () => {
  const postIt = document.getElementById("postIt");
  const nota = localStorage.getItem("notaRapida");

  if (nota && nota.trim() !== "") {
    postIt.textContent = nota;
  } else {
    postIt.textContent = "No tienes notas guardadas aún ✍️";
  }
});
