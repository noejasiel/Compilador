import { comparation } from "../additionals/dictionary.js";
import { parametrosPrintf } from "./parametrosPrintf.js";

export const returnFunction = (contenido, parametersFunction) => {
  //Separamos el tetxo en lineas
  let lineaSeparada = contenido.split("\r");
  let contador = 1;
  // console.log(isEmptyLine(lineaSeparada, contador), "desde nuevo");
  let newCleanCode = isEmptyLine(lineaSeparada, contador);
  //comprobar si la linea sig declara alguntipo de variable
  if (isVariableDeclaration(newCleanCode[1])) {
    console.log("SOY UNA DECLARSCION DE VARIABLE VALIDA");
    typeVariable(newCleanCode[1], parametersFunction, newCleanCode);
  } else {
    console.error("error se esperaba una declaracion de variable");
  }
};

const isVariableDeclaration = (firtstLine) => {
  const bool = true;
  if (comprobateCaseDeclarationVariable(firtstLine)) {
    return bool;
  }
};

const isEmptyLine = (lineaSeparada, contador) => {
  //si la linea esta vacia la elimino
  let count = contador;
  // const expre = /\s*/g;
  const expre = /\S/g;
  //si hay lineas en blanco
  while (!expre.test(lineaSeparada[count])) {
    lineaSeparada.splice(contador, 1);
  }
  //eliminamos linea y devolvemos arreglo
  return lineaSeparada;
};

const typeVariable = (lineaSeparada, parametersFunction, code) => {
  if (lineaSeparada.includes("[]")) {
    console.log("ESTOY EN EL TYPO Y ES ARRAY", parametersFunction, code);
    //se verifica si el for esta correcto y su contenido
    verifyFunctionFill(code);
    // let srtfunction;
    // let nameArray = lineaSeparada.split("=")[0];
    // console.log(nameArray);
    // //traes nombres dinamicos de la funcion
    // let parametroLimpio = parametersFunction[1].split(")");
    // srtfunction = `int* ${parametersFunction[0]} \( int ${parametroLimpio[0]} \) \{ static int* ${nameArray}; ${nameArray} = malloc(${parametroLimpio[0]} * sizeof(int));  \}`;
    // let elemento = document.getElementById("contenido-archivo");
    // elemento.textContent += srtfunction;
  }
};

const verifyFunctionFill = (code) => {
  //limpiamos de espacios en blanco
  let codeClean = isEmptyLine(code, 2);

  //se comprueba si la funcion for es aceptada
  if (isValidFor(codeClean[2])) {
    //si for esta bien verificamos dentro
    if (isVariableDeclaration(codeClean[3]) && verifyAppendArr(codeClean[4])) {
      console.log("si ess un for valido y LOS DATOS SIG SON CORRECTOS");
    }
  } else {
    console.log("La Linea for tiene un error");
  }
};

const isValidFor = (line) => {
  //verifico si casos de for son validos
  const expreFor =
    /for\s+[a-z_]\s+in\s+range\(\s*[a-z0-9]+\s*,\s*([a-z0-9]+|([a-z0-9]+\([a-z0-9]+\)))+\)\:/g;
  return expreFor.test(line);
};

const comprobateCaseDeclarationVariable = (firtstLine) => {
  const bool = true;
  firtstLine.replace("\n", "");
  //hay 2 tipos de declaraciones de variable hasta ahoora
  const expreBasic =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=((\s*)("[a-zA-z]+"|[0-9]+|[a-zA-Z]+|\[\]))/g;
  const expreComplicated =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)(([a-zA-Z]+\s*\(\s*\(\s*[a-zA-Z]*\s*\(\s*"\s*[a-zA-z]*\s*[a-zA-z]*\s*[a-zA-z]*\s*\:\s*"\s*\)\s*\)))/g;
  if (expreBasic.test(firtstLine) | expreComplicated.test(firtstLine)) {
    return bool;
  }
};

const verifyAppendArr = (codeClean) => {
  const bool = true;
  const codeSplit = codeClean.split(".");
  // nombre de la variable
  const nameVariable = codeSplit[0];
  //obteniendo parametro que esta en append
  let parameterAppend = codeSplit[1].split("(")[1].split(")")[0];
  nameVariable.replace(/\n/g, "");
  //expresion regular dinamica
  const newExpre = new RegExp(
    nameVariable + "\\.append\\(" + parameterAppend + "\\)",
    "g"
  );
  if (newExpre.test(codeClean)) return bool;
};
