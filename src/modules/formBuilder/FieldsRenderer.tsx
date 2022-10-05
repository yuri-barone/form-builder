/* eslint-disable @typescript-eslint/no-empty-function */
import { Autocomplete, DatePicker, DateRangePicker, NumericField } from '@euk-labs/componentz';
import { Edit } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFieldStore, useFormConfigStore } from '@hooks/stores';

import { Field } from '@stores/fields';

const FieldRenderer = ({ field }: { field: Field }) => {
  const fieldStore = useFieldStore();

  const handleEdit = () => {
    fieldStore.setFieldToEdit(field);
  };

  const EditButton = () => {
    return (
      <IconButton onClick={handleEdit}>
        <Edit />
      </IconButton>
    );
  };

  switch (field.type) {
    case 'TextField':
      return (
        <TextField
          InputProps={{
            endAdornment: <EditButton />,
          }}
          fullWidth
          label={field.label}
        />
      );
    case 'NumericField':
      return (
        <NumericField
          InputProps={{
            endAdornment: <EditButton />,
          }}
          fullWidth
          precision={0}
          label={field.label}
        />
      );
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
            endAdornment: <EditButton />,
          }}
          value={{ start: new Date(), end: null }}
          label={field.label}
          onChange={() => {}}
        />
      );
    case 'Autocomplete':
      return <Autocomplete fullWidth label={field.label} options={[]} />;
    case 'MaskedField':
      return (
        <TextField
          InputProps={{
            endAdornment: <EditButton />,
          }}
          fullWidth
          label={field.label}
        />
      );
    default:
      return null;
  }
};

const FieldsRenderer = () => {
  const fieldStore = useFieldStore();
  const { breakpoint } = useFormConfigStore();

  return (
    <Grid container spacing={2}>
      {fieldStore.fields.map((field, index) => {
        const gridProps = breakpoint
          ? { xs: field.gridSize?.[breakpoint] || 12 }
          : {
              xs: field.gridSize?.xs || 12,
              sm: field.gridSize?.sm || 12,
              md: field.gridSize?.md || 12,
              lg: field.gridSize?.lg || 12,
              xl: field.gridSize?.xl || 12,
            };
        return (
          <Grid item {...gridProps} key={field.name + index}>
            <FieldRenderer field={field} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default observer(FieldsRenderer);
