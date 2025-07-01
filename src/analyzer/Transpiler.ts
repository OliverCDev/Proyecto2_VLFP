
import { Instruction } from "../models/abstract/Instruction";

export class Transpiler {
  constructor(private instructions: Instruction[]) {}

  public translate(): string {
    return this.instructions.map(instr => instr.translate()).join("\n");
  }

  public execute(): void {
    this.instructions.forEach(instr => instr.execute());
  }
}
