const divPasos = document.getElementById("contentPasos");
const changeColor = document.getElementById("change");

divPasos.addEventListener("click", () => {
  const pasos = document.getElementById("pasos");
  pasos.style.display == "none"
    ? (pasos.style.display = "block")
    : (pasos.style.display = "none");
});

changeColor.addEventListener("click", () => {
  const body = document.querySelector("body");
  // console.log(cName, body.classList, body.classList.contains("hallo"));
  body.classList.contains("hallo")
    ? (body.classList = "cool")
    : (body.classList = "hallo");
});
