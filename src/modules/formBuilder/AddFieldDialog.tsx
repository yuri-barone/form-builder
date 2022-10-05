import { Formix } from '@euk-labs/formix';
import { FXNumericField, FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFieldStore } from '@hooks/stores';

import { Field } from '@stores/fields';

import { zodValidator } from '@utils/zodValidator';

import { AddFieldValues, addFieldSchema } from './addField.schema';

const initialValues = {
  name: '',
  label: '',
  gridSize: {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 2,
  },
};

const AddFieldDialog = ({ field }: { field: Field | null }) => {
  const fieldStore = useFieldStore();
  const fieldType = fieldStore.fieldToInsert;
  const isOpen = !!fieldStore.fieldToInsert || !!field;
  const fieldInitialValues = field && {
    ...field,
    gridSize: {
      xs: field.gridSize?.xs || null,
      sm: field.gridSize?.sm || null,
      md: field.gridSize?.md || null,
      lg: field.gridSize?.lg || null,
      xl: field.gridSize?.xl || null,
    },
  };

  const handleClose = () => {
    fieldStore.clearFieldToInsert();
  };

  const handleSubmit = (values: AddFieldValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (field) {
      fieldStore.editField(values);
      return;
    }
    if (fieldType) {
      fieldStore.addField({
        ...values,
        type: fieldType,
      });
      fieldStore.clearFieldToInsert();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Box p={2}>
        <Formix
          initialValues={fieldInitialValues || initialValues}
          validate={zodValidator(addFieldSchema)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Add {fieldType}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FXTextField autoFocus name="name" label="Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FXTextField name="label" label="Label" />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <FXNumericField precision={0} name="gridSize.xs" label="XS" />
                </Grid>
                <Grid item xs>
                  <FXNumericField precision={0} name="gridSize.sm" label="SM" />
                </Grid>
                <Grid item xs>
                  <FXNumericField precision={0} name="gridSize.md" label="MD" />
                </Grid>
                <Grid item xs>
                  <FXNumericField precision={0} name="gridSize.lg" label="LG" />
                </Grid>
                <Grid item xs>
                  <FXNumericField precision={0} name="gridSize.xl" label="XL" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="auto">
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs="auto">
              <FXSubmitButton label="Submit" />
            </Grid>
          </Grid>
        </Formix>
      </Box>
    </Dialog>
  );
};

export default observer(AddFieldDialog);
