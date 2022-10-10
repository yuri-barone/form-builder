import { Breakpoint } from '@mui/material';
import { AutocompleteOption, ExportToType } from '@types';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import TYPES from '@containers/global.types';

import { submitCypressGenerator } from '@modules/formBuilder/utils/submitCypressGenerator';
import { submitFieldGenerator } from '@modules/formBuilder/utils/submitFieldGenerator';
import { submitSchemaGenerator } from '@modules/formBuilder/utils/submitSchemaGenerator';

import type { FieldStoreType } from './fields';

export type FormConfigStoreType = {
  open: boolean;
  breakpoint: Breakpoint | null;
  formTitle: string;
  generateCypress: boolean;
  exportTo: AutocompleteOption | null;
  validator: AutocompleteOption | null;

  setFormTitle: (title: string) => void;
  submit(): void;
  setGenerateCypress: (generateCypress: boolean) => void;
  setOpen: (open: boolean) => void;
  setBreakpoint: (breakpoint: Breakpoint | null) => void;
  setValidator: (validator: AutocompleteOption | null) => void;
  setExportTo: (exportTo: AutocompleteOption | null) => void;
};

export const exportOptions = [
  { label: 'Shoulders - Seed', value: 'shoulders-seed' },
  { label: 'Portal Eureka', value: 'portal-eureka' },
];

export const validatorOptions = [
  { label: 'Zod', value: 'zod' },
  { label: 'Yup', value: 'yup' },
];

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
  exportTo: AutocompleteOption | null = exportOptions[0];
  validator: AutocompleteOption | null = validatorOptions[0];

  submit() {
    submitFieldGenerator(this.fieldStore.fields, this.formTitle, this.formatedExportTo);
    submitSchemaGenerator(
      this.fieldStore.fields,
      this.formTitle,
      this.validator?.value as 'zod' | 'yup'
    );
    if (this.generateCypress) {
      submitCypressGenerator(this.fieldStore.fields, this.formTitle);
    }
  }

  setExportTo(exportTo: AutocompleteOption | null) {
    this.exportTo = exportTo;
  }

  setValidator(validator: AutocompleteOption | null) {
    this.validator = validator;
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

  private get formatedExportTo(): ExportToType {
    switch (this.exportTo?.value) {
      case 'portal-eureka':
        return 'portalImports';
      default:
        return 'seedImports';
    }
  }
}
