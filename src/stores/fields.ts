import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

export type FieldType =
  | 'TextField'
  | 'NumericField'
  | 'DatePicker'
  | 'DateRangePicker'
  | 'Autocomplete'
  | 'MaskedField';

export type Field = {
  type: FieldType;
  name: string;
  label: string;
  constraints?: {
    required?: boolean;
    min?: number | null;
    max?: number | null;
  };
  gridSize?: {
    xs?: number | null;
    sm?: number | null;
    md?: number | null;
    lg?: number | null;
    xl?: number | null;
  };
};

export type FieldStoreType = {
  fields: Field[];
  addField(field: Field): void;
  resetFields(): void;
  fieldToInsert: Field['type'] | null;
  setFieldToInsert(field: Field['type']): void;
  clearFieldToInsert(): void;
};

@injectable()
export class FieldStore implements FieldStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  fields: Field[] = [];
  fieldToInsert: Field['type'] | null = null;

  addField(field: Field) {
    this.fields.push(field);
  }

  resetFields() {
    this.fields = [];
  }

  setFieldToInsert(field: Field['type']) {
    this.fieldToInsert = field;
  }

  clearFieldToInsert() {
    this.fieldToInsert = null;
  }
}
