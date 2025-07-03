
export interface SymbolEntry {
  name: string;
  value: any;
  row: number;
  column: number;
}

export class SymbolTable {
  private static table: SymbolEntry[] = [];

  public static set(name: string, value: any, row: number, column: number): void {
    const existing = this.table.find(e => e.name === name);
    if (existing) {
      existing.value = value;
    } else {
      this.table.push({ name, value, row, column });
    }
  }

  public static get(): SymbolEntry[] {
    return this.table;
  }

  public static clear(): void {
    this.table = [];
  }
}
