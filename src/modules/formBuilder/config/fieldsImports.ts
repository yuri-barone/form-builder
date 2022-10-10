export type FieldAvailableImportKeys =
  | 'formix'
  | 'textFieldSingle'
  | 'numericFieldSingle'
  | 'maskedFieldSingle'
  | 'dateRangePickerSingle'
  | 'datePickerSingle'
  | 'autocompleteSingle'
  | 'textField'
  | 'numericField'
  | 'maskedField'
  | 'dateRangePicker'
  | 'datePicker'
  | 'autocomplete'
  | 'grid';

export const importsConfig = {
  seedImports: {
    mainFormFieldLib: '@euk-labs/formix-mui',
    form: 'import { Formix } from "@euk-labs/formix";',
    fieldsLib: '@euk-labs/formix',
    textFieldSingle: 'import { FXTextField } from "@euk-labs/formix-mui";',
    numericFieldSingle: 'import { FXNumericField } from "@euk-labs/formix-mui";',
    maskedFieldSingle: 'import { FXMaskedField } from "@euk-labs/formix-mui";',
    dateRangePickerSingle: 'import { FXDateRangePicker } from "@euk-labs/formix-mui";',
    datePickerSingle: 'import { FXDatePicker } from "@euk-labs/formix-mui";',
    autocompleteSingle: 'import { FXAutocomplete } from "@euk-labs/formix-mui";',
    TextField: 'FXTextField',
    NumericField: 'FXNumericField',
    MaskedField: 'FXMaskedField',
    DateRangePicker: 'FXDateRangePicker',
    DatePicker: 'FXDatePicker',
    Autocomplete: 'FXAutocomplete',
    grid: 'import { Grid } from "@mui/material";',
    fieldPrefix: 'FX',
    formComponent: 'Formix',
    formBody: '<Formix onSubmit={handleSubmit} initialValues={initialValues}>',
    formFooter: '</Formix>',
  },
  portalImports: {
    mainFormFieldLib: '@/react-final-form',
    form: 'import { Form } from "react-final-form";',
    fieldsLib: '@/react-final-form',
    textFieldSingle: 'import { RFFTextField } from "@/react-final-form/RFFTextField";',
    numericFieldSingle: 'import { RFFNumericField } from "@/react-final-form/"RFFNumericField;',
    maskedFieldSingle: 'import { RFFMaskedField } from "@/react-final-form/"RFFMaskedField;',
    dateRangePickerSingle:
      'import { RFFDateRangePicker } from "@/react-final-form/"RFFDateRangePicker;',
    datePickerSingle: 'import { RFFDatePicker } from "@/react-final-form/"RFFDatePicker;',
    autocompleteSingle: 'import { RFFAutocomplete } from "@/react-final-form/"RFFAutocomplete;',
    TextField: 'RFFTextField',
    NumericField: 'RFFNumericField',
    MaskedField: 'RFFMaskedField',
    DateRangePicker: 'RFFDateRangePicker',
    DatePicker: 'RFFDatePicker',
    Autocomplete: 'RFFAutocomplete',
    grid: 'import { Grid } from "@material-ui/core";',
    fieldPrefix: 'RFF',
    formComponent: 'Form',
    formBody: '<Form onSubmit={handleSubmit} initialValues={initialValues}>',
    formFooter: '</Form>',
  },
};
