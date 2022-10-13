export const checkParameterDeclarated = (parametersFunction, code) => {
  console.log(parametersFunction, code, "DESDeeee check");
  let bool = true;
  let argumentfunction = parametersFunction[1].split(")")[0];
  let argumentFor = code.find((elemtn) => elemtn.includes("for"));
  argumentFor = argumentFor.split(",")[1].split(")")[0];
  console.log(argumentfunction, argumentFor);
  if (argumentfunction.trim() == argumentFor.trim()) {
    return bool;
  } else {
    console.error(`${argumentFor} no esta definida`);
  }
};
