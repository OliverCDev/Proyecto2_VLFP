
export abstract class Instruction {
  constructor(public row: number, public column: number) {}
  abstract translate(): string;
  abstract execute(): any;
}
