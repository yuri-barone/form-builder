/* eslint-disable @typescript-eslint/no-empty-function */
import { Autocomplete, DatePicker, DateRangePicker, NumericField } from '@euk-labs/componentz';
import { Box, Grid, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFieldStore, useFormConfigStore } from '@hooks/stores';

import { Field } from '@stores/fields';

import FieldPopoverWrapper from './PopoverWrapper';

type FieldRendererProps = {
  field: Field;
};

const FieldRenderer = ({ field }: FieldRendererProps) => {
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
  const { breakpoint } = useFormConfigStore();

  const handlePopoverOpen = (field: Field) => {
    fieldStore.setFieldToEdit(field);
  };

  return (
    <Grid container spacing={2}>
      {fieldStore.fields.map((field, index) => {
        const gridProps = breakpoint
          ? ({
              xs:
                field.gridSize?.[breakpoint] === 'true' ? true : field.gridSize?.[breakpoint] || 12,
            } as unknown as { xs: number | 'auto' | true })
          : ({
              xs: field.gridSize?.xs === 'true' ? true : field.gridSize?.xs || 12,
              sm: field.gridSize?.sm === 'true' ? true : field.gridSize?.sm || 12,
              md: field.gridSize?.md === 'true' ? true : field.gridSize?.md || 12,
              lg: field.gridSize?.lg === 'true' ? true : field.gridSize?.lg || 12,
              xl: field.gridSize?.xl === 'true' ? true : field.gridSize?.xl || 12,
            } as const);
        return (
          <Grid
            component={Box}
            onContextMenu={(e: any) => e.preventDefault()}
            item
            {...gridProps}
            key={field.name + index}
          >
            <FieldPopoverWrapper onOpen={() => handlePopoverOpen(field)}>
              <FieldRenderer field={field} />
            </FieldPopoverWrapper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default observer(FieldsRenderer);
