
import { Instruction } from "../abstract/Instruction";

export class Print extends Instruction {
  constructor(public expression: any, row: number, column: number) {
    super(row, column);
  }

  public translate(): string {
    return `console.log(${this.expression.translate()});`;
  }

  public execute(): any {
    console.log(this.expression.execute());
  }
}
