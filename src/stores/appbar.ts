import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';

export interface AppBarStoreType {
  drawerContent: React.ReactNode | null;
  open?: boolean;
  toggleDrawer(): void;
  setDrawerContent(content: ReactNode | null): void;
  clearDrawerContent(): void;
}

@injectable()
export class AppBarStore implements AppBarStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  drawerContent: ReactNode = null;
  open = false;

  toggleDrawer() {
    this.open = !this.open;
  }

  setDrawerContent(content: ReactNode) {
    this.drawerContent = content;
  }

  clearDrawerContent() {
    this.drawerContent = null;
  }
}
