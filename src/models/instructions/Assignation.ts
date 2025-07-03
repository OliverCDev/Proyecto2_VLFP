
import { Instruction } from "../abstract/Instruction";
import { SymbolTable } from "../tools/SymbolTable";

export class Assignation extends Instruction {
  constructor(
    public identifier: string,
    public expression: any,
    row: number,
    column: number
  ) {
    super(row, column);
  }

  public translate(): string {
    return `${this.identifier} = ${this.expression.translate()};`;
  }

  public execute(): any {
    const value = this.expression.execute();
    SymbolTable.set(this.identifier, value, this.row, this.column);
    return value;
  }
}
