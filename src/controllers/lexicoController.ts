import { Request, Response } from "express";
import LexicalAnalyzer from "../analyzer/LexicalAnalyzer";

export const analizarLexico = (req: Request, res: Response): void => {
  const { entrada } = req.body;

  if (!entrada || typeof entrada !== "string") {
    res.status(400).json({ error: "Entrada inválida" });
    return;
  }

  const analizador = new LexicalAnalyzer();
  analizador.scanner(entrada);

  res.json({
    tokens: analizador.getTokenList(),
    errores: analizador.getErrorList(),
  });
};
