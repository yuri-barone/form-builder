import { Ability } from '@casl/ability';
import { find, keys } from 'ramda';

class Enum<T extends Record<string, string>> {
  private notFound = 'Enum not found';

  constructor(private enumerable: T) {}

  getKey(value: string) {
    return find((key) => this.enumerable[key] === value, keys(this.enumerable)) || this.notFound;
  }

  getValue(key: string) {
    return this.enumerable[key] || this.notFound;
  }
}

export interface AutocompleteOption {
  label: string;
  value: unknown;
}

export interface DateRangeOption {
  start: Date;
  end: Date;
}

export enum Actions {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Manage = 'manage',
}

export enum Subjects {
  User = 'User',
  Person = 'Person',
  Contact = 'Contact',
  Address = 'Address',
  All = 'all',
}

export type AppAbility = Ability<[Actions, Subjects]>;

export interface Role {
  id: string;
  name: string;
  ability: string;
}

export enum ContactType {
  Telefone = 'PHONE',
  'E-mail' = 'EMAIL',
  Facebook = 'FACEBOOK',
  Twitter = 'TWITTER',
  Instagram = 'INSTAGRAM',
  LinkedIn = 'LINKEDIN',
  GitHub = 'GITHUB',
  Website = 'WEBSITE',
}
export const ContactTypeEnum = new Enum(ContactType);

export interface Contact {
  id: string;
  type: ContactType;
  value: string;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Person {
  id: string;
  name: string;
  identifier: string;
  birthDate: Date | string;
  contacts: Contact[];
  addresses: Address[];
}

export interface User {
  id: string;
  email: string;
  avatar: string | null;
  roles: Role[];

  person: Person;
  personId: string;
  password?: string;
}

export type ExportToType = 'seedImports' | 'portalImports';

export type ValidationType = 'yup' | 'zod';
