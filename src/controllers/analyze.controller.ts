
import { Request, Response } from "express";
import LexicalAnalyzer from "../Analyzer/LexicalAnalyzer";
import { SyntaxAnalyzer } from "../Analyzer/SyntaxAnalyzer";
import { Transpiler } from "../Analyzer/Transpiler";
import { SymbolTable } from "../models/tools/SymbolTable";

export const analizarLexico = (req: Request, res: Response): Response => {
  const { entrada } = req.body;

  if (!entrada || typeof entrada !== "string") {
    return res.status(400).json({ error: "Entrada inválida" });
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
      traduccion: "",
      simbolos: []
    });
  }

  SymbolTable.clear();

  const parser = new SyntaxAnalyzer(analizador.getTokens());
  const instrucciones = parser.analizar();

  const transpiler = new Transpiler(instrucciones);
  const traduccion = transpiler.translate();
  const salida = instrucciones.map(instr => instr.execute());

  const simbolos = SymbolTable.get();

  return res.status(200).json({
    tokens,
    errores: [],
    traduccion,
    salida,
    simbolos
  });
};
