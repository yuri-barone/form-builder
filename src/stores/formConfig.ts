import { Breakpoint } from '@mui/material';
import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

export type FormConfigStoreType = {
  open: boolean;
  breakpoint: Breakpoint | null;
  formTitle: string;
  generateCypress: boolean;

  setFormTitle: (title: string) => void;
  setGenerateCypress: (generateCypress: boolean) => void;
  setOpen: (open: boolean) => void;
  setBreakpoint: (breakpoint: Breakpoint | null) => void;
};

@injectable()
export class FormConfigStore implements FormConfigStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  open = false;
  formTitle = '';
  generateCypress = false;
  breakpoint: Breakpoint | null = 'lg';

  setGenerateCypress(generateCypress: boolean) {
    this.generateCypress = generateCypress;
  }

  setOpen(open: boolean) {
    this.open = open;
  }

  setFormTitle(title: string) {
    this.formTitle = title;
  }

  setBreakpoint(breakpoint: Breakpoint | null) {
    this.breakpoint = breakpoint;
  }
}
