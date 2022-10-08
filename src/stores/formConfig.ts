import { Breakpoint } from '@mui/material';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import TYPES from '@containers/global.types';

import { submitFieldGenerator } from '@modules/formBuilder/utils/submitFieldGenerator';

import type { FieldStoreType } from './fields';

export type FormConfigStoreType = {
  open: boolean;
  breakpoint: Breakpoint | null;
  formTitle: string;
  generateCypress: boolean;

  setFormTitle: (title: string) => void;
  submit(): void;
  setGenerateCypress: (generateCypress: boolean) => void;
  setOpen: (open: boolean) => void;
  setBreakpoint: (breakpoint: Breakpoint | null) => void;
};

@injectable()
export class FormConfigStore implements FormConfigStoreType {
  constructor(
    @inject(TYPES.FieldStore)
    private fieldStore: FieldStoreType
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  open = false;
  formTitle = '';
  generateCypress = false;
  breakpoint: Breakpoint | null = 'lg';

  submit() {
    submitFieldGenerator(this.fieldStore.fields, this.formTitle);
  }

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
