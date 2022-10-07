import FileSaver from 'file-saver';

import { Field, GridSize } from '@stores/fields';

import { seedImports } from './config/fieldsImports';

const correctGridSize = (prefix: string, gridSize?: GridSize) => {
  if (!gridSize) return;

  if (gridSize === 'auto') return `${prefix}="auto"`;
  if (gridSize === 'true') return prefix;
  return `${prefix}={${gridSize}}`;
};

const generateTsxTemplate = (field: Field) => {
  let component = `<Grid item [gridSizes]><[field] [props] /></Grid>`;

  const { type, name, label, gridSize } = field;

  if (!type) throw new Error('Type is not defined');

  const { xs, sm, md, lg, xl } = gridSize || {};
  const gridSizes = [
    correctGridSize('xs', xs),
    correctGridSize('sm', sm),
    correctGridSize('md', md),
    correctGridSize('lg', lg),
    correctGridSize('xl', xl),
  ];
  const props: Record<string, unknown> = {
    name,
    label,
    fullWidth: true,
  };

  if (type === 'Autocomplete') {
    props.options = [];
  }

  component = component.replace('[gridSizes]', gridSizes.join(' '));
  component = component.replace('[field]', `FX${type}`);

  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === 'string') {
      return (component = component.replace('[props]', `${key}="${value}" [props]`));
    }

    if (typeof value === 'boolean') {
      if (value) {
        return (component = component.replace('[props]', `${key} [props]`));
      }
    }

    return (component = component.replace('[props]', `${key}={${JSON.stringify(value)}} [props]`));
  });

  component = component.replace('[props]', '');

  return component;
};

const importFromTypeField = (type: Field['type'], single?: boolean) => {
  switch (type) {
    case 'TextField':
      return single ? seedImports.textFieldSingle : seedImports.textField;
    case 'NumericField':
      return single ? seedImports.numericFieldSingle : seedImports.numericField;
    case 'MaskedField':
      return single ? seedImports.maskedFieldSingle : seedImports.maskedField;
    case 'DateRangePicker':
      return single ? seedImports.dateRangePickerSingle : seedImports.dateRangePicker;
    case 'DatePicker':
      return single ? seedImports.datePickerSingle : seedImports.datePicker;
    case 'Autocomplete':
      return single ? seedImports.autocompleteSingle : seedImports.autocomplete;
    default:
      return '';
  }
};

const generateImports = (types: Field['type'][], type?: string) => {
  if (types.length === 1) {
    const seedImportName = importFromTypeField(types[0], true);
    return `${seedImports.grid}
    ${seedImportName}`;
  }

  const fieldsNames = types.map((field) => {
    return importFromTypeField(field);
  });

  return `${seedImports.grid}
import { ${fieldsNames.join(', ')} } from "@euk-labs/formix-mui"`;
};

export const submitFieldGenerator = (fields: Field[], formTitle: string) => {
  const generatedFields = fields.map((field) => generateTsxTemplate(field));
  const generatedImports = generateImports(fields.map((field) => field.type));
  const unspacedFormTitle = formTitle.replace(/\s/g, '');
  const capitalUnspacedFormTitle =
    unspacedFormTitle.charAt(0).toUpperCase() + unspacedFormTitle.slice(1);
  const fileName = formTitle ? `${capitalUnspacedFormTitle}.tsx` : 'Form.tsx';
  const formRFCName = formTitle ? `${capitalUnspacedFormTitle}` : 'Form';

  const template = `${generatedImports}

const ${formRFCName} = () => {
  return (
    <Formix initialValues={{}} onSubmit={}>
      <Grid container spacing={2}>
        ${generatedFields.join('\n')}
      </Grid>
    </Formix>
  )
}
                    
export default ${formRFCName};`;

  const tsxFile = new File([template], fileName, { type: 'text/plain' });
  FileSaver.saveAs(tsxFile);
};
