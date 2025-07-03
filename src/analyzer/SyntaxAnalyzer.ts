
import { Token, Type } from "./Token";
import { Instruction } from "../models/abstract/Instruction";
import { Print } from "../models/instructions/Print";
import { Declaration } from "../models/instructions/Declaration";
import { Assignation } from "../models/instructions/Assignation";
import { If } from "../models/instructions/If";
import { For } from "../models/instructions/For";
import { Primitive } from "../models/expressions/Primitive";
import { Relational } from "../models/expressions/Relational";

export class SyntaxAnalyzer {
  private tokens: Token[];
  private current: number = 0;

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
        this.current++;
      }
    }

    return instructions;
  }

  private parseInstruction(): Instruction | null {
    const token = this.tokens[this.current];

    if (token.lexeme === "Console") return this.parsePrint();
    if (["int", "float", "string", "char", "bool"].includes(token.lexeme)) return this.parseDeclaration();
    if (this.current + 1 < this.tokens.length && this.tokens[this.current + 1].lexeme === "=") return this.parseAssignation();
    if (token.lexeme === "if") return this.parseIf();
    if (token.lexeme === "for") return this.parseFor();

    return null;
  }

  private parsePrint(): Instruction {
    this.matchLexeme("Console");
    this.matchLexeme(".");
    this.matchLexeme("WriteLine");
    this.matchLexeme("(");
    const expr = this.parseExpression();
    this.matchLexeme(")");
    this.matchLexeme(";");
    return new Print(expr, expr.row, expr.column);
  }

  private parseDeclaration(): Instruction {
    const typeToken = this.tokens[this.current++];
    const idToken = this.tokens[this.current++];
    this.matchLexeme("=");
    const expr = this.parseExpression();
    this.matchLexeme(";");
    return new Declaration(idToken.lexeme, typeToken.lexeme, expr, typeToken.row, typeToken.column);
  }

  private parseAssignation(): Instruction {
    const idToken = this.tokens[this.current++];
    this.matchLexeme("=");
    const expr = this.parseExpression();
    this.matchLexeme(";");
    return new Assignation(idToken.lexeme, expr, idToken.row, idToken.column);
  }

  private parseIf(): Instruction {
    const ifToken = this.tokens[this.current++];
    this.matchLexeme("(");
    const cond = this.parseExpression();
    this.matchLexeme(")");
    this.matchLexeme("{");
    const trueBlock: Instruction[] = [];
    while (this.tokens[this.current].lexeme !== "}") {
      const inst = this.parseInstruction();
      if (inst) trueBlock.push(inst);
    }
    this.matchLexeme("}");
    let falseBlock: Instruction[] | null = null;
    if (this.matchLexeme("else")) {
      this.matchLexeme("{");
      falseBlock = [];
      while (this.tokens[this.current].lexeme !== "}") {
        const inst = this.parseInstruction();
        if (inst) falseBlock.push(inst);
      }
      this.matchLexeme("}");
    }
    return new If(cond, trueBlock, falseBlock, ifToken.row, ifToken.column);
  }

  private parseFor(): Instruction {
    const forToken = this.tokens[this.current++];
    this.matchLexeme("(");
    const init = this.parseInstruction();
    const cond = this.parseExpression();
    this.matchLexeme(";");
    const update = this.parseInstruction();
    this.matchLexeme(")");
    this.matchLexeme("{");
    const body: Instruction[] = [];
    while (this.tokens[this.current].lexeme !== "}") {
      const inst = this.parseInstruction();
      if (inst) body.push(inst);
    }
    this.matchLexeme("}");
    return new For(init!, cond, update!, body, forToken.row, forToken.column);
  }

  private parseExpression(): any {
    const left = this.parsePrimitive();
    const token = this.tokens[this.current];
    if (["==", "!=", "<", ">", "<=", ">="].includes(token.lexeme)) {
      const op = token.lexeme;
      this.current++;
      const right = this.parsePrimitive();
      return new Relational(left, op, right, token.row, token.column);
    }
    return left;
  }

  private parsePrimitive(): any {
    const token = this.tokens[this.current++];
    return new Primitive(token.lexeme, token.row, token.column, token.type);
  }

  private matchLexeme(expected: string): boolean {
    if (this.current < this.tokens.length && this.tokens[this.current].lexeme === expected) {
      this.current++;
      return true;
    }
    return false;
  }
}
