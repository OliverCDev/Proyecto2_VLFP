
import { Instruction } from "../abstract/Instruction";

export class If extends Instruction {
  constructor(
    public condition: any,
    public trueBlock: Instruction[],
    public falseBlock: Instruction[] | null,
    row: number,
    column: number
  ) {
    super(row, column);
  }

  public translate(): string {
    const trueCode = this.trueBlock.map(i => i.translate()).join("\n");
    const falseCode = this.falseBlock
      ? "else {\n" + this.falseBlock.map(i => i.translate()).join("\n") + "\n}"
      : "";
    return `if (${this.condition.translate()}) {\n${trueCode}\n}${falseCode}`;
  }

  public execute(): any {
    if (this.condition.execute()) {
      this.trueBlock.forEach(i => i.execute());
    } else if (this.falseBlock) {
      this.falseBlock.forEach(i => i.execute());
    }
  }
}
