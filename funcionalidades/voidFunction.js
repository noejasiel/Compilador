import { parametrosPrintf } from "./parametrosPrintf.js";
import { comparation } from "../additionals/dictionary.js";

export const voidFunction = (contenido, parametersFunction) => {
  try {
    //la funcion necesita parametros, si tiene solo un parentesis entonces
    //no hay parametros
    if (parametersFunction[1] == ")") {
      throw new Error("la funcion no tiene parametros");
    }
    console.log(parametersFunction, "from try");
    let srtfunction;
    console.log(contenido.split(":")[contenido.split(":").length - 1]);
    //aqui me deja solo con la info que trae la funcion
    let bodyFunction = contenido.split(":")[contenido.split(":").length - 1];
    //aqui tiene el nombre de la funcion para imprimmir y
    //los datos que imprimira
    let separarBody = bodyFunction.split(/\(/);
    let parametrosSeparados = parametrosPrintf(parametersFunction[1]);
    if (separarBody[0].includes("print")) {
      srtfunction = `void ${parametersFunction[0]} \( char* ${parametrosSeparados[0]}, int ${parametrosSeparados[1]} \{ ${comparation.print}(${parametersFunction[1]}; }`;
      let elemento = document.getElementById("contenido-archivo");
      elemento.textContent += srtfunction;
    }
  } catch (error) {
    console.log("hubo un error inesperado", error);
  }
};
