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

export const seedImports = {
  form: 'import { Formix } from "@euk-labs/formix";',
  textFieldSingle: 'import { FXTextField } from "@euk-labs/formix-mui";',
  numericFieldSingle: 'import { FXNumericField } from "@euk-labs/formix-mui";',
  maskedFieldSingle: 'import { FXMaskedField } from "@euk-labs/formix-mui";',
  dateRangePickerSingle: 'import { FXDateRangePicker } from "@euk-labs/formix-mui";',
  datePickerSingle: 'import { FXDatePicker } from "@euk-labs/formix-mui";',
  autocompleteSingle: 'import { FXAutocomplete } from "@euk-labs/formix-mui";',
  textField: 'FXTextField',
  numericField: 'FXNumericField',
  maskedField: 'FXMaskedField',
  dateRangePicker: 'FXDateRangePicker',
  datePicker: 'FXDatePicker',
  autocomplete: 'FXAutocomplete',
  grid: 'import { Grid } from "@mui/material";',
};
