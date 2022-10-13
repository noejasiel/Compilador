// import { stackDeclarationVariables } from "../additionals/stackDeclarationVariables.js";

export const handleErrors = (
  codeClean,
  nameVariableDeclaration,
  parameterAppend,
  nameArrAppend,
  nameVariabledeclarationArr, //bueno
  returnnVariable
) => {
  let bool = true;
  console.log(
    codeClean,
    nameVariableDeclaration,
    parameterAppend,
    nameArrAppend,
    nameVariabledeclarationArr,
    returnnVariable,
    "DESDE STACK"
  );
  // let variableDeclaratedInStack = stackDeclarationVariables.indexOf(
  //   wordReservedinDeclaratedLine
  // );

  // if (
  //   nameVariableDeclaration.trim() == parameterAppend.trim() &&
  //   nameVariabledeclarationArr.trim() == nameArrAppend.trim() &&
  //   nameVariabledeclarationArr.trim() == returnnVariable.trim()
  // )
  let count = 0;
  if (nameVariableDeclaration.trim() == parameterAppend.trim()) {
    count = count + 1;
  } else {
    console.error(`${parameterAppend} no esta definida`);
  }
  if (nameVariabledeclarationArr.trim() == nameArrAppend.trim()) {
    count = count + 1;
  } else {
    console.error(`${nameArrAppend} no esta definida en append`);
  }
  if (nameVariabledeclarationArr.trim() == returnnVariable.trim()) {
    count = count + 1;
  } else {
    console.error(`${returnnVariable} no esta definida en el return`);
  }
  console.log("ESTA LA CUENTA", count);
  if (count == 3) return bool;
};
