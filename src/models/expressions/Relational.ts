
import { Type } from "../../Analyzer/Token";

export class Relational {
  constructor(
    public left: any,
    public operator: string,
    public right: any,
    public row: number,
    public column: number
  ) {}

  public translate(): string {
    return `${this.left.translate()} ${this.operator} ${this.right.translate()}`;
  }

  public execute(): boolean {
    const leftVal = this.left.execute();
    const rightVal = this.right.execute();
    switch (this.operator) {
      case "==": return leftVal == rightVal;
      case "!=": return leftVal != rightVal;
      case "<": return leftVal < rightVal;
      case ">": return leftVal > rightVal;
      case "<=": return leftVal <= rightVal;
      case ">=": return leftVal >= rightVal;
    }
    return false;
  }
}
