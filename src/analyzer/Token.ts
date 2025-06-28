export enum Type {
  RESERVED = "Palabra Reservada",
  IDENTIFIER = "Identificador",
  INTEGER = "Número Entero",
  FLOAT = "Número Decimal",
  STRING = "Cadena de Texto",
  CHAR = "Carácter",
  OPERATOR = "Operador",
  SYMBOL = "Símbolo",
  COMMENT = "Comentario",
  BOOLEAN = "Booleano",
  ERROR = "Error Léxico"
}

export class Token {
  constructor(
    public type: Type,
    public lexeme: string,
    public row: number,
    public column: number
  ) {}
}
