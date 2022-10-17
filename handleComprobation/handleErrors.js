export const handleErrors = (
  variableInDeclaration,
  variableIteratorFor,
  variableOriginalDeclaration,
  variableMultiplication,
  variableMultiplicationIguality,
  variableReturn
) => {
  console.log(
    variableInDeclaration,
    variableIteratorFor,
    variableOriginalDeclaration,
    variableMultiplication,
    variableMultiplicationIguality,
    variableReturn,
    "ASDFGHJ"
  );
  let count = 0;
  let bool = true;

  if (variableInDeclaration === variableIteratorFor) {
    count += 1;
  } else {
    console.error(`LA VARIABLE ${variableInDeclaration} no esta definida`);
  }
  if (variableOriginalDeclaration === variableMultiplicationIguality) {
    count += 1;
  } else {
    console.error(
      `LA VARIABLE ${variableMultiplicationIguality} no esta definida`
    );
  }
  if (variableOriginalDeclaration == variableMultiplication) {
    count += 1;
  } else {
    console.error(`LA VARIABLE ${variableMultiplication} no esta definida`);
  }
  if (variableOriginalDeclaration == variableReturn) {
    count += 1;
  } else {
    console.error(`LA VARIABLE ${variableReturn} no esta definida`);
  }
  if (count == 4) return true;
};
