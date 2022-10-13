import { isEmptyLine } from "../utilities/isEmtyLine.js";
import { isVariableDeclaration } from "../funcionalidades/returnFunction.js";
import { arrayDeclaratedParametersFunctions } from "../additionals/arrayStack.js";

export const isSumFunction = (
  codeClean,
  parametersFunction,
  declarationVariable,
  codeFor
) => {
  console.log(
    codeClean,
    parametersFunction,
    declarationVariable,
    "DESDE SUMA FUCION"
  );
  codeClean = isEmptyLine(codeClean, 3);
  codeClean = isEmptyLine(codeClean, 4);

  if (isVariableDeclaration(codeClean[3])) {
    //si los datos estan bien entonces ya debugeo linea x linea
    lineAndLine(codeClean[3], parametersFunction, declarationVariable, codeFor);
  } else {
    console.error("LOS DATOS SUBYACENTES TIENEN ERROR");
  }
};

const lineAndLine = (
  codeClean1,
  parametersFunction,
  declarationVariable,
  codeFor
) => {
  //obteiendo la iteracion de avriable en declaracion
  let variableInDeclaration = codeClean1.split("[")[1].split("]")[0];
  //obteiendo la iteracion de avriable en for
  let variableIteratorFor = codeFor.split("in")[0].split("for")[1].trim();
  console.log(variableIteratorFor, "AQUI E SLA ITERACION VARIABLE");
  // obtenemos nombre de el parametro que veine en el funcion
  let nameParameter = parametersFunction[1].split(")")[0].trim();
  arrayDeclaratedParametersFunctions.push(nameParameter);
  //obtenemos nombre de mi declaraion de variable
  let wordReservedinDeclaratedLine = codeClean1
    .split("+")[1]
    .split("[")[0]
    .trim();
  if (
    handleErrors(codeClean1, variableIteratorFor, wordReservedinDeclaratedLine)
  ) {
    // nombre de la declaracion de la variable
    let nameVariable = declarationVariable.split("=")[0].trim();
    console.log(nameVariable, "DESDE ACAAA");
    let expre = new RegExp(
      nameVariable +
        "\\s*\\=\\s*" +
        nameVariable +
        "\\s*\\+\\s*" +
        wordReservedinDeclaratedLine +
        "\\s*\\[\\s*" +
        variableIteratorFor +
        "\\s*\\]",
      "gm"
    );
    if (expre.test(codeClean1)) {
      let imprimir = `
      int ${parametersFunction[0]}(*${wordReservedinDeclaratedLine}){
      int ${nameVariable} = 0;
      int i =0;
      while(${nameParameter}[i] != -1 ){
          printf("enrtro %d \n", ${nameParameter}[i]);
          i +=1;
      }
      int ${variableIteratorFor} = 0;
        for(${variableIteratorFor} = 0; ${variableIteratorFor} < i; ${variableIteratorFor}++){
            suma += ${nameParameter}[${variableIteratorFor}];
        }
      return ${nameVariable}
      }`;
      let elemento = document.getElementById("contenido-archivo");
      elemento.textContent += imprimir;
    }
  } else {
    console.error(
      `Rayos la varible ---> ${wordReservedinDeclaratedLine} <---- o -----> ${variableInDeclaration} <---- no esta declarada`
    );
  }
};

const handleErrors = (
  codeClean,
  variableIteratorFor,
  wordReservedinDeclaratedLine
) => {
  let bool = true;
  // Obteneniendo el iterador en la declaracion de variable [x]
  let variableInDeclaration = codeClean.split("[")[1].split("]")[0].trim();
  //ver si la variable ya se declaro en el stack
  let variableDeclaratedInStack = arrayDeclaratedParametersFunctions.find(
    (parameter) => parameter == wordReservedinDeclaratedLine
  );
  if (variableInDeclaration == variableIteratorFor && variableDeclaratedInStack)
    return bool;
};
