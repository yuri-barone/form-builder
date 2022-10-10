import { ExportToType } from '@types';
import FileSaver from 'file-saver';

import { Field, GridSize } from '@stores/fields';

import { importsConfig } from '../config/fieldsImports';

const correctGridSize = (prefix: string, gridSize?: GridSize) => {
  if (!gridSize) return;

  if (gridSize === 'auto') return `${prefix}="auto"`;
  if (gridSize === 'true') return prefix;
  return `${prefix}={${gridSize}}`;
};

const generateTsxTemplate = (field: Field, exportTo: ExportToType) => {
  let component = `<Grid item [gridSizes]><[field] [props] /></Grid>`;

  const { type, name, label, gridSize, options, validations } = field;

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
    ...options,
  };

  if (type === 'Autocomplete') {
    props.options = [];
  }

  if (type === 'DatePicker') {
    props.disableFuture = !validations?.allowFutureDates;
    props.disablePast = !validations?.allowRetroactiveDates;
  }

  component = component.replace('[gridSizes]', gridSizes.join(' '));
  component = component.replace('[field]', `${importsConfig[exportTo][type]}`);

  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined) return;
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

const importFromTypeField = (type: Field['type'], exportTo: ExportToType, single?: boolean) => {
  switch (type) {
    case 'TextField':
      return single ? importsConfig[exportTo].textFieldSingle : importsConfig[exportTo].TextField;
    case 'NumericField':
      return single
        ? importsConfig[exportTo].numericFieldSingle
        : importsConfig[exportTo].NumericField;
    case 'MaskedField':
      return single
        ? importsConfig[exportTo].maskedFieldSingle
        : importsConfig[exportTo].MaskedField;
    case 'DateRangePicker':
      return single
        ? importsConfig[exportTo].dateRangePickerSingle
        : importsConfig[exportTo].DateRangePicker;
    case 'DatePicker':
      return single ? importsConfig[exportTo].datePickerSingle : importsConfig[exportTo].DatePicker;
    case 'Autocomplete':
      return single
        ? importsConfig[exportTo].autocompleteSingle
        : importsConfig[exportTo].Autocomplete;
    default:
      return '';
  }
};

const generateImports = (types: Field['type'][], exportTo: ExportToType) => {
  if (types.length === 1) {
    const seedImportName = importFromTypeField(types[0], exportTo, true);
    return `${importsConfig[exportTo].grid}
    ${seedImportName}`;
  }

  const fieldsNames = types.map((field) => {
    return importFromTypeField(field, exportTo);
  });

  return `${importsConfig[exportTo].grid}
${importsConfig[exportTo].form}
import { ${fieldsNames.join(', ')} } from "${importsConfig[exportTo].mainFormFieldLib}"`;
};

const generateFieldsInitialValues = (fields: Field[]) => {
  const initialValues: Record<string, unknown> = {};

  fields.forEach((field) => {
    const { name, type } = field;
    if (type === 'DateRangePicker') {
      initialValues[name] = {
        start: null,
        end: null,
      };
    }
    if (type === 'Autocomplete' || type === 'DatePicker' || type === 'NumericField') {
      initialValues[name] = null;
    } else {
      initialValues[name] = '';
    }
  });

  return initialValues;
};

export const submitFieldGenerator = (
  fields: Field[],
  formTitle: string,
  exportTo: ExportToType
) => {
  const generatedFields = fields.map((field) => generateTsxTemplate(field, exportTo));
  const generatedImports = generateImports(
    fields.map((field) => field.type),
    exportTo
  );
  const unspacedFormTitle = formTitle.replace(/\s/g, '');
  const capitalUnspacedFormTitle =
    unspacedFormTitle.charAt(0).toUpperCase() + unspacedFormTitle.slice(1);
  const fileName = formTitle ? `${capitalUnspacedFormTitle}.tsx` : 'Form.tsx';
  const formRFCName = formTitle ? `${capitalUnspacedFormTitle}` : 'Form';
  const generatedInitialValues = generateFieldsInitialValues(fields);

  const template = `${generatedImports}

const initialValues = ${JSON.stringify(generatedInitialValues, null, 2)}

const ${formRFCName} = () => {
  return (
    ${importsConfig[exportTo].formBody}
      <Grid container spacing={2}>
        ${generatedFields.join('\n')}
      </Grid>
    ${importsConfig[exportTo].formFooter}
  )
}
                    
export default ${formRFCName};`;

  const tsxFile = new File([template], fileName, { type: 'text/plain' });
  FileSaver.saveAs(tsxFile);
};
