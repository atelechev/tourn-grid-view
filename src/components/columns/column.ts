
export class Column {

  constructor(private readonly _code: string,
    private readonly _index: number,
    private _hidden: boolean,
    private readonly _canOrderBy: boolean,
    private readonly _canFilterOn: boolean) {
  }

  public get code(): string {
    return this._code;
  }

  public get index(): number {
    return this._index;
  }

  public get canFilterOn(): boolean {
    return this._canFilterOn;
  }

  public get canOrderBy(): boolean {
    return this._canOrderBy;
  }

  public get hidden(): boolean {
    return this._hidden;
  }

}
