import FileSaver from 'file-saver';

import { Field } from '@stores/fields';

const getValidationByType = (type: Field['type'], validatorType: 'zod' | 'yup') => {
  switch (type) {
    case 'TextField':
      return 'string()';
    case 'NumericField':
      return 'number()';
    case 'DatePicker':
      return 'date()';
    case 'Autocomplete':
      return `object({ label: ${validatorType}.string(), value: ${validatorType}.unkown() }).nullable()`;
    case 'MaskedField':
      return 'string()';
    default:
      return 'string()';
  }
};

export const submitSchemaGenerator = (fields: Field[], formTitle: string, type: 'zod' | 'yup') => {
  const splitedTitle = formTitle.split(' ');
  const typeTitle = splitedTitle
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
  const schemaTitle = splitedTitle
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
  const fileName = `${schemaTitle}.schema.ts`;

  const template = `import * as ${type} from '${type}'
  
export const ${schemaTitle} = ${type}.object({
${fields
  .map((field) => {
    const { validations } = field;

    if (field.type === 'DatePicker') {
      return `${field.name}: ${type}.${getValidationByType(field.type, type)}${
        validations?.allowFutureDates ? '' : '.max(new Date())'
      }${validations?.allowRetroactiveDates ? '' : '.min(new Date())'}.nullable()`;
    }

    if (field.type === 'DateRangePicker') {
      return `${field.name}: ${type}.object({
        start: ${type}.date()${validations?.startAllowFutureDates ? '' : '.max(new Date())'}${
        validations?.startAllowRetroactiveDates ? '' : '.min(newDate())'
      }.nullable()${
        type === 'zod'
          ? validations?.required
            ? ''
            : '.optional()'
          : validations?.required
          ? '.required()'
          : ''
      },
        end: ${type}.date()${validations?.endAllowFutureDates ? '' : '.max(new Date())'}${
        validations?.endAllowRetroactiveDates ? '' : '.min(newDate())'
      }.nullable(),
      })`;
    }

    return `${field.name}: ${type}.${getValidationByType(field.type, type)}${
      validations?.min ? `.min(${validations.min})` : ''
    }${validations?.max ? `.max(${validations.max})` : ''}${
      type === 'zod'
        ? validations?.required
          ? ''
          : '.optional()'
        : validations?.required
        ? '.required()'
        : ''
    }`;
  })
  .join(',')}
})

export type ${typeTitle} = ${type}.infer<typeof ${schemaTitle}>`;

  const tsxFile = new File([template], fileName, { type: 'text/plain' });
  FileSaver.saveAs(tsxFile);
};
