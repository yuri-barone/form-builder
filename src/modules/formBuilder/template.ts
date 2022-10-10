import { ExportToType } from '@types';
import { join, mapObjIndexed, pluck, uniq, values } from 'ramda';

import { Field } from '@stores/fields';

import { importsConfig } from './config/fieldsImports';
import { correctGridSize } from './utils/submitFieldGenerator';

enum Template {
  gridImport = 'grid_import',
  formImport = 'form_import',
  fieldsImports = 'fields_imports',
  fieldsLib = 'fields_lib',
  initialValues = 'initial_values',
  formName = 'form_name',
  formComponent = 'form_component',
  fields = 'fields',
  component = 'component',
  field = 'field',
  props = 'props',
  gridProps = 'grid_props',
}

export const formTemplate = `
[grid_import]
[form_import]
import {
  [fields_imports]
} from "[fields_lib]";

const initialValues = [initial_values]

const [form_name] = () => {

  function handleSubmit(values: unknown) {
    /**
     * Implement your submit function here
     */ 
  }
  
  return (
    <[form_component] initialValues={initialValues} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        [fields]
      </Grid>
    </[form_component]>
  );
};

export default [form_name];
`;

export const fieldTemplate = `
<Grid item [grid_props]>
  <[field] [props] />
</Grid>
`;

function buildFieldComponent(field: Field, prefix: string) {
  const { xs, sm, md, lg, xl } = field.gridSize || {};
  const gridSizes = [
    correctGridSize('xs', xs),
    correctGridSize('sm', sm),
    correctGridSize('md', md),
    correctGridSize('lg', lg),
    correctGridSize('xl', xl),
  ];
  let props: Record<string, unknown> = {
    name: field.name,
    label: field.label,
    fullWidth: true,
    ...field.options,
    disableFuture: field.type === 'DatePicker' ? !field.validations?.allowFutureDates : undefined,
    disablePast:
      field.type === 'DatePicker' ? !field.validations?.allowRetroactiveDates : undefined,
    options: field.type === 'Autocomplete' ? [] : undefined,
  };

  props = mapObjIndexed((value, key) => {
    if (value === undefined) return;

    if (typeof value === 'string') {
      return `${key}="${value}" [props]`;
    }

    if (typeof value === 'boolean') {
      if (value) {
        return `${key} [props]`;
      }
    }

    return `${key}={${JSON.stringify(value)}} [props]`;
  }, props);

  return fieldTemplate
    .replace(Template.gridProps, gridSizes.join(' '))
    .replace(Template.field, prefix + field.type)
    .replace(Template.props, values(props).join(' '));
}

export function buildFormFile(fields: Field[], formTitle: string, exportTo: ExportToType) {
  const config = importsConfig[exportTo];
  let file = formTemplate.replaceAll(Template.formName, formTitle);

  file = file.replace(Template.gridImport, config.grid);
  file = file.replace(Template.formImport, config.form);
  file = file.replace(Template.fieldsImports, join(',\n', uniq(pluck('type', fields))));
  file = file.replace(Template.fieldsLib, config.fieldsLib);
  file = file.replace(Template.formComponent, config.formComponent);

  const inputs = fields.map((field) => {
    return buildFieldComponent(field, config.fieldPrefix);
  });

  file = file.replace(Template.fields, inputs.join('\n'));

  return file;
}
