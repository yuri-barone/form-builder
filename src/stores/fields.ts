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

export type GridSize = number | 'true' | 'auto' | null;

export type Field = {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  gridSize?: {
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
  };
  options?: {
    precision?: number;
    mask?: string;
  };
  validations?: {
    required?: boolean;
    min?: number;
    max?: number;
    startAllowRetroactiveDates?: boolean;
    endAllowRetroactiveDates?: boolean;
    startAllowFutureDates?: boolean;
    endAllowFutureDates?: boolean;
    allowRetroactiveDates?: boolean;
    allowFutureDates?: boolean;
  };
};

export type FieldStoreType = {
  fields: Field[];
  fieldToEdit: Field | null;
  fieldToInsert: Field['type'] | null;

  addField(field: Omit<Field, 'id'>): void;
  editField(field: Omit<Field, 'id' | 'type'>): void;
  deleteField(id: Field['id']): void;
  resetFields(): void;
  setFieldToInsert(field: Field['type']): void;
  setFieldToEdit(field: Field | null): void;
  moveFieldUp(id: Field['id']): void;
  moveFieldDown(id: Field['id']): void;
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

  moveFieldUp(id: Field['id']) {
    const index = this.fields.findIndex((f) => f.id === id);
    if (index > 0) {
      const temp = this.fields[index - 1];
      this.fields[index - 1] = this.fields[index];
      this.fields[index] = temp;
    }
  }

  moveFieldDown(id: Field['id']) {
    const index = this.fields.findIndex((f) => f.id === id);
    if (index < this.fields.length - 1) {
      const temp = this.fields[index + 1];
      this.fields[index + 1] = this.fields[index];
      this.fields[index] = temp;
    }
  }

  deleteField(id: Field['id']) {
    this.fields = this.fields.filter((f) => f.id !== id);
  }

  setFieldToEdit(field: Field | null): void {
    this.fieldToEdit = field;
  }

  editField(field: Omit<Field, 'id' | 'type'>) {
    if (this.fieldToEdit) {
      const index = this.fields.findIndex((f) => f.id === this.fieldToEdit!.id);
      if (index !== -1) {
        this.fields[index] = { ...field, id: this.fieldToEdit!.id, type: this.fieldToEdit!.type };
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
