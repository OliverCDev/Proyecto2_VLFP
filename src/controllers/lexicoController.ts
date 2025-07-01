import { Request, Response } from "express";
import LexicalAnalyzer from "../analyzer/LexicalAnalyzer";
import { SyntaxAnalyzer } from "../analyzer/SyntaxAnalyzer";
import { Transpiler } from "../analyzer/Transpiler";

export const analizarLexico = (req: Request, res: Response): void => {
  const { entrada } = req.body;

  if (!entrada || typeof entrada !== "string") {
    res.status(400).json({ error: "Entrada inválida" });
    return;
  }

  const analizador = new LexicalAnalyzer();
  analizador.scanner(entrada);

  const tokens = analizador.getTokens().map(token => ({
    row: token.row,
    column: token.column,
    lexeme: token.lexeme,
    type: token.type
  }));

  const erroresLexicos = analizador.getErrors().map(error => ({
    row: error.row,
    column: error.column,
    lexeme: error.lexeme,
    type: "Error Léxico"
  }));

  if (erroresLexicos.length > 0) {
    return res.status(200).json({
      tokens,
      errores: erroresLexicos,
      salida: [],
      traduccion: ""
    });
  }

  const parser = new SyntaxAnalyzer(analizador.getTokens());
  const instrucciones = parser.analizar();

  const transpiler = new Transpiler(instrucciones);
  const traduccion = transpiler.translate();
  const salida = instrucciones.map(instr => instr.execute());

  res.status(200).json({
    tokens,
    errores: [],
    traduccion,
    salida
  });
};