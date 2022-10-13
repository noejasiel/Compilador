import { comparation } from "../additionals/dictionary.js";
import { parametrosPrintf } from "./parametrosPrintf.js";
import { isEmptyLine } from "../utilities/isEmtyLine.js";
import { isValidFor } from "../utilities/isValidFor.js";
import { isSumFunction } from "../functions/sum.js";
import { arrayDeclaratedParametersFunctions } from "../additionals/arrayStack.js";
import { stackDeclarationVariables } from "../additionals/stackDeclarationVariables.js";
import { handleErrors } from "../handleComprobation/declarationVariable.js";
import { checkParameterDeclarated } from "../handleComprobation/checkParameterDeclarated.js";

export const returnWithFunction = (contenido, parametersFunction) => {
  //Separamos el tetxo en lineas
  let lineaSeparada = contenido.split("\r");
  let contador = 1;
  // envia la linea siguiente avr si no esta vacia COMPROBAR
  // SI NO HAY INEAS RARAS, ---> VER LIBRETAS <---
  let newCleanCode = isEmptyLine(lineaSeparada, contador);
  //comprobar si la linea sig declara alguntipo de variable
  if (isVariableDeclaration(newCleanCode[1], lineaSeparada)) {
    console.log("SOY UNA DECLARSCION DE VARIABLE VALIDA");
    typeVariable(newCleanCode[1], parametersFunction, newCleanCode);
  } else {
    console.error("error se esperaba una declaracion de variable");
  }
};

export const isVariableDeclaration = (firtstLine) => {
  const declarationVariableGeneralExpe =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)(([a-zA-Z]+\s*\(\s*[a-z]+\s*\(\s*"(\s*[a-zA-Z0-9]*\s*)*(\:|)\s*"\s*\){2})|((int)(?!\())|"\s*.*\s*"|([0-9]+[a-zA-Z]*)*|[a-zA-Z]+|\[\]|\{\}|[a-zA-Z]+\s*[+]\s*[a-zA-Z]+\s*([[]\s*[a-z]*[0-9]*\s*]+))$/m;
  const bool = true;
  if (declarationVariableGeneralExpe.test(firtstLine)) return bool;
  // if (comprobateCaseDeclarationVariable(firtstLine)) {
  //   return bool;
  // }
};

const typeVariable = (lineaSeparada, parametersFunction, code) => {
  let typeFunction;
  if (lineaSeparada.includes("[]")) {
    //es array
    typeFunction = 1;
    //se verifica si el for esta correcto y su contenido despues de comprobar el arreglo
    verifyFunctionFill(code, parametersFunction, lineaSeparada, typeFunction);
  }
  // si tiene un numero hacer exprtesion regular
  if (lineaSeparada.includes("0")) {
    typeFunction = 2;
    verifyFunctionFill(code, parametersFunction, lineaSeparada, typeFunction);
  }
};

const verifyFunctionFill = (
  code,
  parametersFunction,
  declarationVariable,
  typeFunction
) => {
  //limpiamos de espacios en blanco
  let codeClean = isEmptyLine(code, 2);
  //indicar si hay un for, si no decir que esperaba uno y dara error ----Z>>>> OJO AQUIIII

  //se comprueba si la funcion for es aceptada
  if (isValidFor(codeClean[2])) {
    if (typeFunction == 1) {
      //llenar lista
      isArrayFunction(
        codeClean,
        parametersFunction,
        declarationVariable,
        codeClean[2],
        code
      );
    }
    if (typeFunction == 2) {
      isSumFunction(
        codeClean,
        parametersFunction,
        declarationVariable,
        codeClean[2]
      );
    }
  } else {
    console.error("La Linea for tiene un error");
  }
};

const verifyAppendArr = (
  codeClean,
  codeElementprevious,
  declarationVariable,
  code
) => {
  try {
    //name de la variable []
    let nameVariabledeclarationArr = declarationVariable.split("=")[0].trim();
    //obteniendo la variable de retorno del return
    let returnnVariable = code
      .find((data) => data.includes("return"))
      .split("return")[1]
      .trim();
    // nombre de la variable ya declarada anteriormente
    let nameVariableDeclaration = codeElementprevious.split("=")[0].trim();
    // stackDeclarationVariables.push(nameVariableDeclaration);
    const bool = true;
    const codeSplit = codeClean.split(".");
    // nombre de la variable
    const nameArrAppend = codeSplit[0].trim();
    //obteniendo parametro que esta en append
    let parameterAppend = codeSplit[1].split("(")[1].split(")")[0];
    nameArrAppend.replace(/\n/g, "");
    // ver si ya esta declarado
    //se verifica si el elemento en parametros de append
    //esta declarado
    //esat verifica si las variables estan declaradas
    if (
      handleErrors(
        codeClean,
        nameVariableDeclaration,
        parameterAppend,
        nameArrAppend,
        nameVariabledeclarationArr,
        returnnVariable
      )
    ) {
      const newExpre = new RegExp(
        //expresion regular dinamica
        nameArrAppend + "\\.append\\(\\s*" + parameterAppend + "\\s*\\)",
        "g"
      );
      if (newExpre.test(codeClean)) return bool;
    } else {
      throw new Error(
        `Vaya parece que ---> ${parameterAppend.trim()} 0 ${nameArrAppend.trim()} o ${returnnVariable} <----  no esta declarada`
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

const isArrayFunction = (
  codeClean,
  parametersFunction,
  declarationVariable,
  codeCleanLine,
  code
) => {
  //si for esta bien verificamos dentro
  codeClean = isEmptyLine(codeClean, 3);
  codeClean = isEmptyLine(codeClean, 4);
  if (
    isVariableDeclaration(codeClean[3]) &&
    verifyAppendArr(codeClean[4], codeClean[3], declarationVariable, code) &&
    checkParameterDeclarated(parametersFunction, code)
  ) {
    //si los datos estan bien entonces ya debugeo linea x linea
    lineAndLine(
      codeClean[3],
      codeClean[4],
      parametersFunction,
      declarationVariable,
      codeCleanLine
    );
    console.log("si ess un for valido y LOS DATOS SIG SON CORRECTOS");
  } else {
    console.error("LOS DATOS SUBYACENTES TIENEN ERROR");
  }
};

const lineAndLine = (
  codeClean1,
  codeClean2,
  parametersFunction,
  declarationVariable,
  codeCleanLineFor
) => {
  const codeInPrintf = codeClean1.split(/"/)[1].trim();
  let parameterFor = parametersFunction[1].split(")")[0].trim();
  let variableArr = declarationVariable.split("=")[0].trim();
  //sacar variable de iteracion en el for
  let variableIteratorFor = codeCleanLineFor
    .split("in")[0]
    .split("for")[1]
    .trim();

  //funcion para coprobar la primera linea
  if (codeClean1.includes("int") && codeClean1.includes("input")) {
    let imprimir = `
    int *llenarLista(int ${parameterFor}){
    static int* ${variableArr};
    ${variableArr} = (int*)malloc(${parameterFor} * sizeof(int));
    int ${variableIteratorFor};
    for( ${variableIteratorFor}=0; ${variableIteratorFor}< ${parameterFor}; ${variableIteratorFor}++){
      printf("${codeInPrintf}");
      scanf("%d", &${variableArr}[${variableIteratorFor}]);
    }
    return ${variableArr};
    }`;
    let elemento = document.getElementById("contenido-archivo");
    elemento.textContent += imprimir;
  }
};
