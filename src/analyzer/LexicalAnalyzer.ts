import { Token, Type } from "./Token";

const RESERVED_WORDS: string[] = [
  "int", "float", "char", "string", "bool",
  "if", "else", "for", "Console", "WriteLine", "true", "false"
];

const SYMBOLS: string[] = ["+", "-", "*", "/", "=", ";", "(", ")", "{", "}", ",", "<", ">", "!"];

class LexicalAnalyzer {
  private row: number;
  private column: number;
  private auxWord: string;
  private tokenList: Token[];
  private errorList: Token[];

  constructor() {
    this.row = 1;
    this.column = 0;
    this.auxWord = "";
    this.tokenList = [];
    this.errorList = [];
  }

  scanner(input: string) {
    input += "#";
    let char: string;
    let state = 0;

    for (let i = 0; i < input.length; i++) {
      char = input[i];
      this.column++;

      switch (state) {
        case 0:
          if (this.isLetter(char)) {
            this.auxWord += char;
            state = 1;
          } else if (this.isDigit(char)) {
            this.auxWord += char;
            state = 2;
          } else if (char === '"') {
            this.auxWord += char;
            state = 3;
          } else if (char === "'") {
            this.auxWord += char;
            state = 4;
          } else if (char === '/') {
            this.auxWord += char;
            state = 5;
          } else if (SYMBOLS.includes(char)) {
            this.auxWord += char;
            state = 6;
          } else if (char === '\n') {
            this.row++;
            this.column = 0;
          } else if (char === ' ' || char === '\t' || char === '\r') {
            // ignore whitespace
          } else if (char === "#") {
            break;
          } else {
            this.errorList.push(new Token(Type.ERROR, char, this.row, this.column));
          }
          break;

        case 1: // identificador o palabra reservada
          if (this.isLetterOrDigit(char)) {
            this.auxWord += char;
          } else {
            const type = RESERVED_WORDS.includes(this.auxWord)
              ? (["true", "false"].includes(this.auxWord) ? Type.BOOLEAN : Type.RESERVED)
              : Type.IDENTIFIER;
            this.tokenList.push(new Token(type, this.auxWord, this.row, this.column - this.auxWord.length));
            this.auxWord = "";
            state = 0;
            i--;
          }
          break;

         case 2: // número entero o decimal
          if (this.isDigit(char)) {
            this.auxWord += char;
          } else if (char === ".") {
            if (this.auxWord.includes(".")) {
              this.errorList.push(new Token(Type.ERROR, this.auxWord + char, this.row, this.column - this.auxWord.length));
              this.auxWord = "";
              state = 0;
            } else {
              this.auxWord += char;
              state = 7; // vamos a reconocer un float
            }
          } else {
            this.tokenList.push(new Token(Type.INTEGER, this.auxWord, this.row, this.column - this.auxWord.length));
            this.auxWord = "";
            state = 0;
            i--;
          }
          break;
        case 3: // cadena de texto
          this.auxWord += char;
          if (char === '"') {
            this.tokenList.push(new Token(Type.STRING, this.auxWord, this.row, this.column - this.auxWord.length + 1));
            this.auxWord = "";
            state = 0;
          }
          break;

        case 4: // carácter
          this.auxWord += char;
          if (char === "'") {
            this.tokenList.push(new Token(Type.CHAR, this.auxWord, this.row, this.column - this.auxWord.length + 1));
            this.auxWord = "";
            state = 0;
          }
          break;

        case 5: // comentario o división
          if (char === '/') {
            while (i < input.length && input[i] !== '\n') {
              this.auxWord += input[i];
              i++;
            }
            this.tokenList.push(new Token(Type.COMMENT, this.auxWord, this.row, this.column - this.auxWord.length));
            this.auxWord = "";
            state = 0;
            this.row++;
            this.column = 0;
          } else if (char === '*') {
            this.auxWord += char;
            i++;
            while (i < input.length - 1 && !(input[i] === '*' && input[i + 1] === '/')) {
              this.auxWord += input[i];
              if (input[i] === '\n') {
                this.row++;
                this.column = 0;
              }
              i++;
            }
            this.auxWord += "*/";
            i++;
            this.tokenList.push(new Token(Type.COMMENT, this.auxWord, this.row, this.column - this.auxWord.length));
            this.auxWord = "";
            state = 0;
          } else {
            this.tokenList.push(new Token(Type.OPERATOR, "/", this.row, this.column - 1));
            state = 0;
            i--;
          }
          break;

        case 6: // operadores o símbolos
          if (char === "=") {
            this.auxWord += char;
            this.tokenList.push(new Token(Type.OPERATOR, this.auxWord, this.row, this.column - 1));
          } else {
            this.tokenList.push(new Token(Type.SYMBOL, this.auxWord, this.row, this.column - 1));
            i--;
          }
          this.auxWord = "";
          state = 0;
          break;

        case 7: // decimal
          if (this.isDigit(char)) {
            this.auxWord += char;
          } else {
            this.tokenList.push(new Token(Type.FLOAT, this.auxWord, this.row, this.column - this.auxWord.length));
            this.auxWord = "";
            state = 0;
            i--;
          }
          break;
      }
    }
  }

  private isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isLetterOrDigit(char: string): boolean {
    return /[a-zA-Z0-9_]/.test(char);
  }

  getTokenList(): Token[] {
    return this.tokenList;
  }

  getErrorList(): Token[] {
    return this.errorList;
  }
}

export default LexicalAnalyzer;
