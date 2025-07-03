
import { Instruction } from "../abstract/Instruction";

export class For extends Instruction {
  constructor(
    public init: Instruction,
    public condition: any,
    public update: Instruction,
    public body: Instruction[],
    row: number,
    column: number
  ) {
    super(row, column);
  }

  public translate(): string {
    return `for (${this.init.translate()} ${this.condition.translate()}; ${this.update.translate()}) {\n${this.body.map(i => i.translate()).join("\n")}\n}`;
  }

  public execute(): any {
    for (
      this.init.execute();
      this.condition.execute();
      this.update.execute()
    ) {
      this.body.forEach(i => i.execute());
    }
  }
}
