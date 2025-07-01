
import { Type } from "../../Analyzer/Token";

export class Primitive {
  constructor(
    public value: string,
    public row: number,
    public column: number,
    public type: Type
  ) {}

  public translate(): string {
    return this.value;
  }

  public execute(): any {
    if (this.type === Type.STRING) return this.value;
    if (this.type === Type.NUMBER) return Number(this.value);
    return this.value;
  }
}
