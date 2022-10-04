import { Formix } from '@euk-labs/formix';
import { FXNumericField, FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';
import { Box, Button, Dialog, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFieldStore } from '@hooks/stores';

import { zodValidator } from '@utils/zodValidator';

import AddFieldConstraintFields from './AddFieldConstraintFields';
import { AddFieldValues, addFieldSchema } from './addField.schema';

const initialValues = {
  name: '',
  label: '',
  haveMin: false,
  haveMax: false,
  constraints: {
    required: false,
    min: null,
    max: null,
  },
  gridSize: {
    xs: 12,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
};

const AddFieldDialog = () => {
  const fieldStore = useFieldStore();
  const fieldType = fieldStore.fieldToInsert;
  const isOpen = !!fieldStore.fieldToInsert;

  const handleClose = () => {
    fieldStore.clearFieldToInsert();
  };

  const handleSubmit = (values: AddFieldValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { haveMax, haveMin, ...rest } = values;
    if (fieldType) {
      fieldStore.addField({
        ...rest,
        type: fieldType,
      });
      fieldStore.clearFieldToInsert();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Box p={2}>
        <Formix
          initialValues={initialValues}
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
              <FXTextField name="name" label="Name" />
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
            <Grid item xs={12}>
              <AddFieldConstraintFields />
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
