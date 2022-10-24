export const addElementMainDom = (text) => {
  const p = document.createElement("dd");
  p.textContent = text;
  const br = document.createElement("br");
  const father = document.getElementById("mainContenido");
  console.log(father);
  father.appendChild(p);
  father.appendChild(br);
};
