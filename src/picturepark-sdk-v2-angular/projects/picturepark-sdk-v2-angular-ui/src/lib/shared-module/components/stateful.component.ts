import { Signal, WritableSignal, signal } from '@angular/core';
import { BaseComponent } from './base.component';

export abstract class StatefulComponent<T> extends BaseComponent {
  private _state: WritableSignal<T>;
  state: Signal<T>;

  constructor(state: T) {
    super();

    this._state = signal(state);
    this.state = this._state.asReadonly();
  }

  patchState(partial: Partial<T>) {
    this._state.update(s => ({ ...s, ...partial }));
  }
}
