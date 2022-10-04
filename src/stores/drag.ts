import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

export type DragStoreType = {
  activeId: string | null;
  setActiveId(id: string | number): void;
  clearActiveId(): void;
};

@injectable()
export class DragStore implements DragStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  activeId: string | null = null;

  setActiveId(id: string) {
    this.activeId = id;
  }

  clearActiveId() {
    this.activeId = null;
  }
}
