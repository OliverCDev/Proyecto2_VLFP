import { Token, Type } from "./Token";
import { Carrera } from "../models/Carrera";
import { Semestre } from "../models/Semestre";
import { Curso } from "../models/Curso";

export function construirCarreras(tokens: Token[]): Carrera[] {
  const carreras: Carrera[] = [];
  let i: number = 0;

  while (i < tokens.length) {
    const token = tokens[i];


    if (token.getTypeToken() === Type.PALABRA_RESERVADA && token.getLexema() === "Carrera") {

      const carrera: Carrera = new Carrera("", []);

      if (
        tokens[i + 1]?.getTypeToken() === Type.DOS_PUNTOS &&
        tokens[i + 2]?.getTypeToken() === Type.CADENA_DE_TEXTO
      ) {
        const nombreCarrera = tokens[i + 2].getLexema().replace(/"/g, "");
        carrera.setNombre(nombreCarrera);
        i += 3;

        if (tokens[i]?.getTypeToken() === Type.CORCHETE_ABRE) {
          i++; 
        } else {
          console.error("Error: Se esperaba CORCHETE_ABRE después del nombre de la carrera");
          return carreras;
        }

        
        while (i < tokens.length && tokens[i].getTypeToken() !== Type.CORCHETE_CIERRA) {

         
          if (tokens[i]?.getTypeToken() === Type.PALABRA_RESERVADA && tokens[i].getLexema() === "Semestre") {
            if (
              tokens[i + 1]?.getTypeToken() === Type.DOS_PUNTOS &&
              tokens[i + 2]?.getTypeToken() === Type.NUMERO
            ) {
              const semestre = new Semestre(Number(tokens[i + 2].getLexema()), []);
              i += 3;

              if (tokens[i]?.getTypeToken() === Type.LLAVE_ABRE) {
                i++;

                
                while (i < tokens.length && tokens[i].getTypeToken() !== Type.LLAVE_CIERRA) {

                  
                  if (tokens[i]?.getTypeToken() === Type.PALABRA_RESERVADA && tokens[i].getLexema() === "Curso") {
                    if (tokens[i + 1]?.getTypeToken() === Type.DOS_PUNTOS &&
                        tokens[i + 2]?.getTypeToken() === Type.NUMERO) {

                      const curso = new Curso(Number(tokens[i + 2].getLexema()), "", 0, []);
                      i += 3;

                      if (tokens[i]?.getTypeToken() === Type.LLAVE_ABRE) {
                        i++;

                      
                        while (i < tokens.length && tokens[i].getTypeToken() !== Type.LLAVE_CIERRA) {

                          const fieldToken = tokens[i];

                          if (fieldToken.getTypeToken() === Type.PALABRA_RESERVADA) {
                            switch (fieldToken.getLexema()) {
                              case "Nombre":
                                if (tokens[i + 1]?.getTypeToken() === Type.DOS_PUNTOS &&
                                    tokens[i + 2]?.getTypeToken() === Type.CADENA_DE_TEXTO) {
                                  curso.setName(tokens[i + 2].getLexema().replace(/"/g, ""));
                                  i += 3;
                                } else {
                                  i++;
                                }
                                break;
                              case "Area":
                                if (tokens[i + 1]?.getTypeToken() === Type.DOS_PUNTOS &&
                                    tokens[i + 2]?.getTypeToken() === Type.NUMERO) {
                                  curso.setArea(Number(tokens[i + 2].getLexema()));
                                  i += 3;
                                } else {
                                  i++;
                                }
                                break;
                              case "Prerrequisitos":
                                if (tokens[i + 1]?.getTypeToken() === Type.DOS_PUNTOS &&
                                    tokens[i + 2]?.getTypeToken() === Type.PARENTESIS_ABRE) {
                                  i += 3;
                                  // Leer los prerrequisitos
                                  while (i < tokens.length && tokens[i].getTypeToken() !== Type.PARENTESIS_CIERRA) {
                                    if (tokens[i].getTypeToken() === Type.NUMERO) {
                                      curso.getPrerrequisitos().push(Number(tokens[i].getLexema()));
                                    }
                                    i++;
                                  }
                                
                                  if (tokens[i]?.getTypeToken() === Type.PARENTESIS_CIERRA) {
                                    i++;
                                  }
                                } else {
                                  i++;
                                }
                                break;
                              default:
                                i++;
                            }
                          } else {
                            i++;
                          }
                        }

                     
                        if (tokens[i]?.getTypeToken() === Type.LLAVE_CIERRA) {
                          i++;
                        }
                        semestre.getCursos().push(curso);
                      }
                    } else {
                      i++;
                    }
                  } else {
                    i++;
                  }
                }

                
                if (tokens[i]?.getTypeToken() === Type.LLAVE_CIERRA) {
                  i++;
                }
                carrera.getSemestres().push(semestre);
              }
            } else {
              i++;
            }
          } else {
            i++;
          }
        }

        
        if (tokens[i]?.getTypeToken() === Type.CORCHETE_CIERRA) {
          i++;
        }
        carreras.push(carrera);
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  console.log("Carreras construidas correctamente:");
  console.log(carreras);
  return carreras;
}
