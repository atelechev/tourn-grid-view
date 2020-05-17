import { EventsHandler } from 'components/ui-selections/events-handler';
import { UiEvent } from 'components/ui-selections/ui-event';

describe('EventsHanlder', () => {

  const handler = new EventsHandler();

  describe('getObservable', () => {

    it('should return observables for all supported events', () => {
      [
        'filter-type-change',
        'filter-item-change',
        'shown-columns-change',
        'sort-column-change',
        'selected-row-change',
        'control-panel-toggle'
      ].forEach((event: UiEvent) => {
        expect(handler.getObservable(event)).toBeDefined();
      });
    });

    it('should return undefined for undefined arg', () => {
      expect(handler.getObservable(undefined)).toBeUndefined();
    });

  });

});
