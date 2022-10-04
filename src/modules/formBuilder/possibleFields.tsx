/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Autocomplete,
  DatePicker,
  DateRangePicker,
  MaskedField,
  NumericField,
} from '@euk-labs/componentz';
import { TextField } from '@mui/material';

export type Field = {
  title: string;
  alias: string;
  type: string;
  example: React.ReactNode;
};

const POSSIBLE_FIELDS: Field[] = [
  {
    title: 'Text Field',
    alias: 'TF',
    type: 'TextField',
    example: <TextField fullWidth label="Text Field" />,
  },
  {
    title: 'Numeric Field',
    alias: 'NF',
    type: 'NumericField',
    example: <NumericField fullWidth precision={2} label="Numeric Field" />,
  },
  {
    title: 'Date Picker',
    alias: 'DP',
    type: 'DatePicker',
    example: <DatePicker value={new Date()} onChange={() => {}} label="Date Picker" />,
  },
  {
    title: 'Date Range Picker',
    alias: 'DRP',
    type: 'DateRangePicker',
    example: (
      <DateRangePicker label="Date Range" onChange={() => {}} value={{ start: null, end: null }} />
    ),
  },
  {
    title: 'Autocomplete',
    alias: 'AC',
    type: 'Autocomplete',
    example: (
      <Autocomplete
        label="Autocomplete"
        options={[
          { label: 'foo', value: 'foo' },
          { label: 'bar', value: 'bar' },
        ]}
      />
    ),
  },
  {
    title: 'Masked Field',
    alias: 'MF',
    type: 'MaskedField',
    example: <MaskedField label="Masked Field" mask="(99) 99999-9999" />,
  },
];

export default POSSIBLE_FIELDS;
