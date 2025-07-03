
import { Instruction } from "../abstract/Instruction";
import { Type } from "../../Analyzer/Token";
import { SymbolTable } from "../tools/SymbolTable";

export class Declaration extends Instruction {
  constructor(
    public identifier: string,
    public declaredType: string,
    public expression: any,
    row: number,
    column: number
  ) {
    super(row, column);
  }

  public translate(): string {
    return `let ${this.identifier} = ${this.expression.translate()};`;
  }

  public execute(): any {
    const value = this.expression.execute();
    SymbolTable.set(this.identifier, value, this.row, this.column);
    return value;
  }
}
