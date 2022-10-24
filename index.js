import { parametrosPrintf } from "./funcionalidades/parametrosPrintf.js";
import { voidFunction } from "./funcionalidades/voidFunction.js";
import { returnWithFunction } from "./funcionalidades/returnFunction.js";
import { countFunctions } from "./utilities/countFunctions.js";
import { arrPrimary } from "./additionals/arrPrimary.js";
import { comprobateIdentation } from "./funcionalidades/comprobateIdentation.js";
import { mainMenu } from "./functions/mainMenu.js";
import { handleErrorsDisplay } from "./handleComprobation/handleErrorsDisplay.js";

export let callFunction = [];
var cout = 1;

document
  .getElementById("file-input")
  .addEventListener("change", leerArchivo, false);

function leerArchivo(e) {
  console.log(e.target.files[0]);
  let archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  let lector = new FileReader();
  //una vez leido entramos a esta funcion
  lector.onload = (e) => {
    let contenido = e.target.result;
    contenido = contenido.split("def");
    arrPrimary.push(contenido);
    // let main = arrPrimary[0][arrPrimary[0].length - 1]
    //   .split("return")[1]
    //   .split("\r\n");
    //   mainMenu(main);
    //pinta contenido en html
    // mostrarContenido(contenido);
    //llamando a la funcion que
    // completara funciones
    // if (mainMenu(main)) {
    //   isFunction(1);
    // }
    isFunction(1);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {
  let elemento = document.getElementById("contenido-archivo");
  elemento.innerHTML = contenido;
}

// dividir funciones en arreglos
// diferentes para trabajarlas con facilidad
export const isFunction = () => {
  try {
    if (arrPrimary[0][cout] != undefined) {
      let imprimir = arrPrimary[0][cout];
      cout = cout + 1;
      //ya tenemos la funcion completa añadiendole def
      imprimir = "def " + imprimir;
      let functionResult = comprobarFuncion(imprimir);
      console.log(comprobarFuncion(imprimir), functionResult, "desde aqui");
      if (functionResult) {
        //si funcion correcta hay que ver si
        // su contenido es correcto
        //Y SI SU IDENTACION ES CORRECTA
        console.log(comprobateIdentation(imprimir));
        if (comprobateIdentation(imprimir)) {
          readContent(functionResult);
        } else {
          throw new Error("HAY UN PROBLEMA DE IDENTACION");
        }
      } else {
        throw new Error(
          `ERROR, LA FUNCION NO ES CORRECTA ${imprimir} EN LA LINEA ${imprimir[0]} `
        );
      }
    } else {
      let main = arrPrimary[0][arrPrimary[0].length - 1]
        .split("return")[1]
        .split("\r\n");
      mainMenu(main);
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
  // RECORRERA EL ARREGLO QUE CONTINE LAS FUNCIONES Y LO IMPRIMIRA
};

const comprobarFuncion = (funcion) => {
  //limpio mi funcion de saltos de linea
  let funcionLimpia = funcion.replace("\r | \n", "");
  let regex =
    // /^def\s+[a-zA-Z]+\([a-zA-Z]*((\s*)([a-zA-z-_]*)(\,?))*[^,]\)\:$/gm;
    /^def\s+[a-zA-Z]+\(([a-zA-z]*)((\s*|\,)?((\s*)[a-zA-Z]+)(\s*|\,)?)*(\)\:$)/gm;
  //si hay un macth el text con la Exp me devuelve un arreglo de esta
  // let result = funcionLimpia.match(regex);
  //hasta aqui ya es una funcion casi 100%
  let resul2 = regex.test(funcionLimpia);
  // console.log(result, resul2, "aquiiii ");
  console.log(resul2, "aquiiii ");

  //regresamos la funcion en caso de que sea valida
  return resul2 ? funcion : false;
};

const readContent = (contenido) => {
  console.log(contenido, "desde readcontent");
  //exp regular para detectar name de las funciones
  const expre =
    /([^(def):\s\.r])[^a-z]*[a-zA-Z]+[a-zA-Z]+\(([a-zA-z]*)((\s*|\,)?((\s*)[a-zA-Z]+)(\s*|\,)?)*(\))/gm;
  const namesArr = contenido.match(expre);
  //por obviedad siempre el primer item es el name de la funcion
  //por lo tanto lo pondre en una pila para cuando sea llamada
  //ya este en el banco
  // si hay otra funcion se vera que hay que hacer
  console.log(namesArr[0].split(/\(/));
  //agrego el nombre de la funcion a un array global
  // debugger;
  callFunction.push(namesArr[0].split(/\(/)[0]);
  let parametersFunction = namesArr[0].split(/\(/);
  console.log(callFunction);
  // comprobateIdentation()
  transformFunctionToC(contenido, parametersFunction);
};

const transformFunctionToC = (contenido, parametersFunction) => {
  // debugger;
  if (contenido.includes("return")) {
    //Funcion  Tipo de dato
    returnWithFunction(contenido, parametersFunction);
  }
  if (!contenido.includes("return")) {
    //Funcion Void
    voidFunction(contenido, parametersFunction);
  }
};
