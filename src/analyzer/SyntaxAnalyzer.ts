import { Token, Type } from "./Token";

class SyntaxAnalyzer {
  private tokens: Token[];
  private current: number = 0;
  private errores: string[] = [];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public analizar(): string[] {
    this.current = 0;
    this.errores = [];
    this.parsePrograma();
    return this.errores;
  }

  private match(type: Type): boolean {
    if (this.current < this.tokens.length && this.tokens[this.current].type === type) {
      this.current++;
      return true;
    }
    return false;
  }

  private expect(type: Type, mensaje: string): void {
    if (!this.match(type)) {
      const token = this.tokens[this.current] || this.tokens[this.current - 1];
      this.errores.push(`Error sintáctico en fila ${token.row}, columna ${token.column}: ${mensaje}`);
      this.sincronizar();
    }
  }

  private sincronizar(): void {
    while (this.current < this.tokens.length) {
      const lex = this.tokens[this.current].lexeme;
      if (lex === ";" || lex === "{" || lex === "}" || this.tokens[this.current].type === Type.RESERVED) {
        return;
      }
      this.current++;
    }
  }

  private parsePrograma(): void {
    while (this.current < this.tokens.length) {
      const prev = this.current;
      this.parseSentencia();
      if (this.current === prev) this.current++; // Protección adicional
    }
  }

  private parseSentencia(): void {
    const token = this.tokens[this.current];
    if (!token) return;

    const start = this.current;

    switch (token.lexeme) {
      case "int":
      case "float":
      case "char":
      case "string":
      case "bool":
        this.parseDeclaracion();
        break;
      case "if":
        this.parseIf();
        break;
      case "for":
        this.parseFor();
        break;
      case "Console":
        this.parseImpresion();
        break;
      case "{":
        this.match(Type.SYMBOL); // {
        while (
          this.current < this.tokens.length &&
          this.tokens[this.current].lexeme !== "}"
        ) {
          const prev = this.current;
          this.parseSentencia();
          if (this.current === prev) this.current++;
        }
        this.expect(Type.SYMBOL, "Se esperaba '}'");
        break;
      default:
        this.parseAsignacion();
        break;
    }

    if (this.current === start) this.current++; // Protege en caso de no avance
  }

  private parseDeclaracion(): void {
    if (!this.match(this.tokens[this.current].type)) {
      const token = this.tokens[this.current] || this.tokens[this.current - 1];
      this.errores.push(`Error sintáctico en fila ${token.row}, columna ${token.column}: Se esperaba tipo de dato`);
      this.sincronizar();
      return;
    }

    if (!this.match(Type.IDENTIFIER)) {
      const token = this.tokens[this.current] || this.tokens[this.current - 1];
      this.errores.push(`Error sintáctico en fila ${token.row}, columna ${token.column}: Se esperaba un identificador`);
      this.sincronizar();
      return;
    }

    if (this.match(Type.OPERATOR)) {
      this.parseExpresion();
    }

    this.expect(Type.SYMBOL, "Se esperaba ';'");
  }

  private parseAsignacion(): void {
    if (!this.match(Type.IDENTIFIER)) {
      const token = this.tokens[this.current] || this.tokens[this.current - 1];
      this.errores.push(`Error sintáctico en fila ${token.row}, columna ${token.column}: Se esperaba un identificador al inicio de una asignación`);
      this.sincronizar();
      return;
    }
    this.expect(Type.OPERATOR, "Se esperaba '='");
    this.parseExpresion();
    this.expect(Type.SYMBOL, "Se esperaba ';'");
  }

  private parseImpresion(): void {
    this.expect(Type.IDENTIFIER, "Se esperaba 'Console'");
    this.expect(Type.SYMBOL, "Se esperaba '.'");
    this.expect(Type.IDENTIFIER, "Se esperaba 'WriteLine'");
    this.expect(Type.SYMBOL, "Se esperaba '('");
    this.parseExpresion();
    this.expect(Type.SYMBOL, "Se esperaba ')'");
    this.expect(Type.SYMBOL, "Se esperaba ';'");
  }

  private parseIf(): void {
    this.match(Type.RESERVED); // if
    this.expect(Type.SYMBOL, "Se esperaba '('");
    this.parseExpresion();
    this.expect(Type.SYMBOL, "Se esperaba ')'");
    this.parseSentencia();
    if (this.tokens[this.current]?.lexeme === "else") {
      this.match(Type.RESERVED); // else
      this.parseSentencia();
    }
  }

  private parseFor(): void {
    this.match(Type.RESERVED); // for
    this.expect(Type.SYMBOL, "Se esperaba '('");
    this.parseAsignacion();
    this.parseExpresion();
    this.expect(Type.SYMBOL, "Se esperaba ';'");
    this.parseAsignacion();
    this.expect(Type.SYMBOL, "Se esperaba ')'");
    this.parseSentencia();
  }

  private parseExpresion(): void {
    this.parseValor();
    while (
      this.tokens[this.current] &&
      (this.tokens[this.current].type === Type.OPERATOR ||
        (this.tokens[this.current].type === Type.SYMBOL &&
         ["==", "!=", "<", ">", "<=", ">="].includes(this.tokens[this.current].lexeme)))
    ) {
      this.current++; // operador
      this.parseValor();
    }
  }

  private parseValor(): void {
    const token = this.tokens[this.current];
    if (!token) return;

    if (
      [Type.INTEGER, Type.FLOAT, Type.STRING, Type.CHAR, Type.BOOLEAN].includes(token.type) ||
      token.type === Type.IDENTIFIER
    ) {
      this.current++;
    } else {
      this.errores.push(`Valor inesperado en fila ${token.row}, columna ${token.column}: '${token.lexeme}'`);
      this.current++;
    }
  }
}

export default SyntaxAnalyzer;