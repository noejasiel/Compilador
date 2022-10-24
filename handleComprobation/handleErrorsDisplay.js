export const handleErrorsDisplay = (error) => {
  const father = document.getElementById("error");
  father.style.display = "block";
  const p = document.createElement("p");
  p.textContent = `${error.message} `;
  father.appendChild(p);
};
