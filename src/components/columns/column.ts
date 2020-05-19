import { Semantics } from 'components/columns/semantics';
import { SerializedStyles } from '@emotion/core';
import { standardNarrowColumnStyle } from 'components/columns/column-styles';

export abstract class Column {

  constructor(private readonly _name: string,
    private readonly _index: number,
    private readonly _semantics: Semantics,
    private readonly _hidden: boolean,
    private readonly _canOrderBy: boolean,
    private readonly _canFilterOn: boolean) {
  }

  public get name(): string {
    return this._name;
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

  public get semantics(): Semantics {
    return this._semantics;
  }

  public hasSemantics(semantics: Semantics): boolean {
    return this.semantics == semantics;
  }

  public get styles(): SerializedStyles {
    return standardNarrowColumnStyle;
  }

}
