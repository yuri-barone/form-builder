/* eslint-disable @typescript-eslint/no-empty-function */
import { Autocomplete, DatePicker, DateRangePicker, NumericField } from '@euk-labs/componentz';
import { Grid, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFieldStore } from '@hooks/stores';

import { Field } from '@stores/fields';

const FieldRenderer = ({ field }: { field: Field }) => {
  switch (field.type) {
    case 'TextField':
      return <TextField fullWidth label={field.label} />;
    case 'NumericField':
      return <NumericField fullWidth precision={0} label={field.label} />;
    case 'DatePicker':
      return (
        <DatePicker
          InputProps={{
            fullWidth: true,
          }}
          value={new Date()}
          label={field.label}
          onChange={() => {}}
        />
      );
    case 'DateRangePicker':
      return (
        <DateRangePicker
          InputProps={{
            fullWidth: true,
          }}
          value={{ start: new Date(), end: null }}
          label={field.label}
          onChange={() => {}}
        />
      );
    case 'Autocomplete':
      return <Autocomplete fullWidth label={field.label} options={[]} />;
    case 'MaskedField':
      return <TextField fullWidth label={field.label} />;
    default:
      return null;
  }
};

const FieldsRenderer = () => {
  const fieldStore = useFieldStore();
  return (
    <Grid container spacing={2}>
      {fieldStore.fields.map((field, index) => (
        <Grid
          item
          xs={field.gridSize?.xs || 12}
          sm={field.gridSize?.sm || 12}
          md={field.gridSize?.md || 12}
          lg={field.gridSize?.lg || 12}
          xl={field.gridSize?.xl || 12}
          key={field.name + index}
        >
          <FieldRenderer field={field} />
        </Grid>
      ))}
    </Grid>
  );
};

export default observer(FieldsRenderer);
