import { comparation } from "../additionals/dictionary.js";
export const returnFunction = (contenido, parametersFunction) => {
  console.log("SOY RETURN", contenido, parametersFunction);
  let lineaSeparada = contenido.split("\r");
  console.log(lineaSeparada);
  let contador = 1;
  console.log(isEmptyLine(lineaSeparada, contador), "desde nuevo");
  //comprobar si la linea sig declara alguntipo de variable

  // console.log(isVariableDeclaration(lineaSeparada[1]));
};

const isVariableDeclaration = (firtstLine) => {
  const expre =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)("[a-zA-z]+"|[0-9]+|[a-zA-Z]+|\[\])/g;
  const result = expre.test(firtstLine);
  // Si es es una declaracion de variable valida devolvemos true
  return result;
};

const isEmptyLine = (lineaSeparada, contador) => {
  //si la linea esta vacia la elimino
  console.log(contador, lineaSeparada, "desde aca");
  // const expre = /\s*/g;
  const expre = /\S/g;
  if (!expre.test(lineaSeparada[contador])) {
    lineaSeparada.splice(contador, 1);
    console.log("soy line SOLAAA");
    return lineaSeparada;
  } else {
    console.log("soy line OCUPADA");

    return lineaSeparada;
  }
};
