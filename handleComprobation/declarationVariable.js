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
  if (count == 3) return bool;
};
