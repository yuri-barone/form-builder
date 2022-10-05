import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { uuid } from 'uuidv4';

export type FieldType =
  | 'TextField'
  | 'NumericField'
  | 'DatePicker'
  | 'DateRangePicker'
  | 'Autocomplete'
  | 'MaskedField';

export type Field = {
  id: string;
  type: FieldType;
  name: string;
  label: string;
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
  fieldToEdit: Field | null;
  fieldToInsert: Field['type'] | null;

  addField(field: Omit<Field, 'id'>): void;
  editField(field: Omit<Field, 'id' | 'type'>): void;
  resetFields(): void;
  setFieldToInsert(field: Field['type']): void;
  setFieldToEdit(field: Field | null): void;
  clearFieldToInsert(): void;
};

@injectable()
export class FieldStore implements FieldStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  fields: Field[] = [];
  fieldToInsert: Field['type'] | null = null;
  fieldToEdit: Field | null = null;

  setFieldToEdit(field: Field | null): void {
    this.fieldToEdit = field;
  }

  editField() {
    if (this.fieldToEdit) {
      const index = this.fields.findIndex((f) => f.id === this.fieldToEdit!.id);
      if (index !== -1) {
        this.fields[index] = this.fieldToEdit;
      }
      this.setFieldToEdit(null);
    }
  }

  addField(field: Field) {
    this.fields.push({ ...field, id: uuid() });
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
