import { Token, Type } from "./Token";
import { Instruction } from "../models/abstract/Instruction";
import { Print } from "../models/instructions/Print";
import { Primitive } from "../models/expressions/Primitive";

export class SyntaxAnalyzer {
  private tokens: Token[];
  private current: number = 0;
  private errores: string[] = [];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public analizar(): Instruction[] {
    this.current = 0;
    const instructions: Instruction[] = [];

    while (this.current < this.tokens.length) {
      const inst = this.parseInstruction();
      if (inst) {
        instructions.push(inst);
      } else {
        this.current++; // Skip invalid token
      }
    }

    return instructions;
  }

  private parseInstruction(): Instruction | null {
    const token = this.tokens[this.current];
    if (token.lexeme === "Console" &&
        this.matchLexeme("Console") &&
        this.matchLexeme(".") &&
        this.matchLexeme("WriteLine") &&
        this.matchLexeme("(")) {

      const expr = this.parseExpression();
      this.matchLexeme(")");
      this.matchLexeme(";");

      return new Print(expr, token.row, token.column);
    }

    return null;
  }

  private parseExpression(): any {
    const token = this.tokens[this.current];
    if (
      token.type === Type.STRING ||
      token.type === Type.INTEGER ||
      token.type === Type.FLOAT
    ) {
      this.current++;
      return new Primitive(token.lexeme, token.row, token.column, token.type);
    }

    return new Primitive("undefined", token.row, token.column, Type.IDENTIFIER);
  }

  private matchLexeme(expected: string): boolean {
    if (this.current < this.tokens.length &&
        this.tokens[this.current].lexeme === expected) {
      this.current++;
      return true;
    }
    return false;
  }
}
