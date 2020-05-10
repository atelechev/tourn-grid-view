import { UiEvent } from './ui-event';
import { BehaviorSubject, Observable } from 'rxjs';
import { Column } from '../columns/column';


export class EventsHandler {

  private readonly _eventSubjects: Map<UiEvent, BehaviorSubject<any>>;

  private readonly _eventObservables: Map<UiEvent, Observable<any>>;

  constructor() {
    this._eventSubjects = new Map<UiEvent, BehaviorSubject<any>>();
    this._eventObservables = new Map<UiEvent, Observable<any>>();
    this.initEventSubjects();
    this.initObservables();
  }

  private initEventSubjects(): void {
    this._eventSubjects.set(
      'shown-columns-change',
      new BehaviorSubject<Array<Column>>(undefined)
    );
    this._eventSubjects.set(
      'filter-type-change',
      new BehaviorSubject<string>(undefined)
    );
    this._eventSubjects.set(
      'filter-item-change',
      new BehaviorSubject<any>(undefined)
    );
    this._eventSubjects.set(
      'sort-column-change',
      new BehaviorSubject<Column>(undefined)
    );
    this._eventSubjects.set(
      'selected-row-change',
      new BehaviorSubject<Array<any>>(undefined)
    );
    this._eventSubjects.set(
      'control-panel-toggle',
      new BehaviorSubject<boolean>(undefined)
    );
  }

  private initObservables(): void {
    [
      'filter-type-change',
      'filter-item-change',
      'shown-columns-change',
      'sort-column-change',
      'selected-row-change',
      'control-panel-toggle'
    ].forEach((event: UiEvent) => {
      this._eventObservables.set(
        event,
        this.getHandler(event).asObservable()
      );
    });
  }

  private getHandler(event: UiEvent): BehaviorSubject<any> {
    return this._eventSubjects.get(event);
  }

  public getObservable(event: UiEvent): Observable<any> {
    return this._eventObservables.get(event);
  }

  public fireEvent(event: UiEvent, propagateObj: any): void {
    if (event) {
      this.getHandler(event).next(propagateObj);
    }
  }

}
