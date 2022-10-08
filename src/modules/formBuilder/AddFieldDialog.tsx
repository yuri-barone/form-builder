import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';
import { Box, Button, Collapse, Dialog, Grid, SpeedDialIcon, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFieldStore } from '@hooks/stores';

import { Field } from '@stores/fields';

import { zodValidator } from '@utils/zodValidator';

import { AddFieldValues, addFieldSchema } from './schemas/addField.schema';
import { parseFieldStoreToValues, parseFieldValuesToStore } from './utils/parseValues';
import { getSchemaField } from './utils/schemaFieldsBuilder';

export const addFieldInitialValues = {
  name: '',
  label: '',
  gridSize: {
    xs: '12',
    sm: '6',
    md: '4',
    lg: '3',
    xl: '2',
  },
};

const AddFieldDialog = ({ field }: { field: Field | null }) => {
  const fieldStore = useFieldStore();
  const fieldType = fieldStore.fieldToInsert;
  const isOpen = !!fieldStore.fieldToInsert;
  const fieldInitialValues = field && parseFieldStoreToValues(field);
  const [openAdvanced, setOpenAdvanced] = React.useState(false);
  const schemaBuilder = fieldType && getSchemaField(fieldType);

  const handleClose = () => {
    if (field) {
      fieldStore.setFieldToEdit(null);
    }
    fieldStore.clearFieldToInsert();
  };

  const handleSubmit = (values: AddFieldValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const correctValues = parseFieldValuesToStore(values);
    if (field) {
      fieldStore.editField(correctValues);
      return;
    }
    if (fieldType) {
      fieldStore.addField({
        ...correctValues,
        type: fieldType,
      });
      fieldStore.clearFieldToInsert();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Box p={2}>
        <Formix
          initialValues={fieldInitialValues || addFieldInitialValues}
          validate={zodValidator(addFieldSchema)}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12}>
              <Typography variant="h5">
                {field ? `Edit ${field.name}` : `Add ${fieldType}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FXTextField inputProps={{ autoFocus: true }} name="name" label="Name" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FXTextField name="label" label="Label" />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs>
                  <FXTextField name="gridSize.xs" label="XS" />
                </Grid>
                <Grid item xs>
                  <FXTextField name="gridSize.sm" label="SM" />
                </Grid>
                <Grid item xs>
                  <FXTextField name="gridSize.md" label="MD" />
                </Grid>
                <Grid item xs>
                  <FXTextField name="gridSize.lg" label="LG" />
                </Grid>
                <Grid item xs>
                  <FXTextField name="gridSize.xl" label="XL" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Collapse in={openAdvanced} unmountOnExit>
                {schemaBuilder && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Validations</Typography>
                    </Grid>
                    {schemaBuilder.map((option) => (
                      <Grid item xs={option.size} key={option.name}>
                        <option.field fullWidth name={option.name} label={option.label} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Collapse>
            </Grid>
            <Grid item xs="auto">
              <Button
                variant="outlined"
                onClick={() => setOpenAdvanced(!openAdvanced)}
                endIcon={<SpeedDialIcon open={openAdvanced} />}
              >
                {openAdvanced ? 'Hide advanced' : 'Show advanced'}
              </Button>
            </Grid>
            <Grid item xs="auto">
              <Grid container spacing={2}>
                <Grid item xs="auto">
                  <Button variant="outlined" color="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs="auto">
                  <FXSubmitButton label="Submit" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Formix>
      </Box>
    </Dialog>
  );
};

export default observer(AddFieldDialog);
