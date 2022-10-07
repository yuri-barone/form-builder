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
  const { type, name, label, gridSize } = field;
  const { xs, sm, md, lg, xl } = gridSize || {};
  const correctedXs = correctGridSize('xs', xs);
  const correctedSm = correctGridSize('sm', sm);
  const correctedMd = correctGridSize('md', md);
  const correctedLg = correctGridSize('lg', lg);
  const correctedXl = correctGridSize('xl', xl);

  switch (type) {
    case 'TextField':
      return `<Grid item ${correctedXs} ${correctedSm} ${correctedMd} ${correctedLg} ${correctedXl}>
            <FXTextField
              name="${name}"
              label="${label}"
              fullWidth
            />
          </Grid>`;
    case 'NumericField':
      return `<Grid item ${correctedXs} ${correctedSm} ${correctedMd} ${correctedLg} ${correctedXl}>
            <FXNumericField
              name="${name}"
              label="${label}"
              fullWidth
            />
          </Grid>`;
    case 'MaskedField':
      return `<Grid item ${correctedXs} ${correctedSm} ${correctedMd} ${correctedLg} ${correctedXl}>
            <FXMaskedField
              name="${name}"
              label="${label}"
              fullWidth
            />
          </Grid>`;
    case 'DateRangePicker':
      return `<Grid item ${correctedXs} ${correctedSm} ${correctedMd} ${correctedLg} ${correctedXl}>
            <FXDateRangePicker
              name="${name}"
              label="${label}"
              fullWidth
            />
          </Grid>`;
    case 'DatePicker':
      return `<Grid item ${correctedXs} ${correctedSm} ${correctedMd} ${correctedLg} ${correctedXl}>
            <FXDatePicker
              name="${name}"
              label="${label}"
              fullWidth
            />
          </Grid>`;
    case 'Autocomplete':
      return `<Grid item ${correctedXs} ${correctedSm} ${correctedMd} ${correctedLg} ${correctedXl}>
            <FXAutocomplete
              name="${name}"
              label="${label}"
              fullWidth
              options={[]}
            />
          </Grid>`;
    default:
      return '';
  }
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
        ${generatedFields.join(' ')}
      </Grid>
    </Formix>
  )
}
                    
export default ${formRFCName};`;

  const tsxFile = new File([template], fileName, { type: 'text/plain' });
  FileSaver.saveAs(tsxFile);
};
