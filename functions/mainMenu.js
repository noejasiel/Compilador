export const mainMenu = (main) => {
  // debugger;
  console.log(comprobateFunctionVariable(main[2]));
  //pq al momento del splt hay basura
  try {
    let count = 2;
    let zeroSpaces = /^\s/m;
    while (main[count] != undefined) {
      // debugger;
      if (!zeroSpaces.test(main[count])) {
        if (
          comprobateFunctionVariable(main[count]) ||
          comprobateDeclarationVariable(main[count])
        ) {
          count += 1;
        } else {
          throw new Error(`VAYA PARECCE QUE ${main[count]} TIENE UN ERROR`);
        }
      } else {
        throw new Error(
          `VAYA PARECCE QUE LA IDENTACION ${main[count]} NO ES CORRECTA`
        );
      }
    }
    if (count == 10) {
      return true;
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const comprobateDeclarationVariable = (line) => {
  const expreGral =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)([a-zA-Z]*)\s*\(\s*((("\s*.*")\s*\))|(int\s*\([a-zA-z]+\){2})|([a-zA-Z]*\)))/;
  if (expreGral.test(line)) {
    return true;
  }
};
const comprobateFunctionVariable = (line) => {
  // debugger;
  const expreGral = /^[a-zA-z]*\s*\(\s*".*"(\)$|\s*,\s*[a-zA-Z]+\s*\)$)/g;
  //  ? true : false;
  if (expreGral.test(line)) {
    return true;
  }
};
