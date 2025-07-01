import { Request, Response } from "express";
import LexicalAnalyzer from "../analyzer/LexicalAnalyzer";
import SyntaxAnalyzer from "../analyzer/SyntaxAnalyzer";
import { Type } from "../analyzer/Token";

export const analizarLexico = (req: Request, res: Response): void => {
  const { entrada } = req.body;

  if (!entrada || typeof entrada !== "string") {
    res.status(400).json({ error: "Entrada inválida" });
    return;
  }

  const analizador = new LexicalAnalyzer();
  analizador.scanner(entrada);

  const tokens = analizador.getTokenList().map(token => ({
    row: token.row,
    colum: token.column,
    lexema: token.lexeme,
    typeTokenString: token.type
  }));

  const erroresLexicos = analizador.getErrorList().map(error => ({
    row: error.row,
    colum: error.column,
    lexema: error.lexeme,
    typeTokenString: "Error Léxico"
  }));

  const analizadorSintactico = new SyntaxAnalyzer(analizador.getTokenList());
  const erroresSintacticos = analizadorSintactico.analizar().map(mensaje => ({
    mensaje,
    typeTokenString: "Error Sintáctico"
  }));

  res.json({
    tokens,
    errores: [...erroresLexicos, ...erroresSintacticos]
  });
};