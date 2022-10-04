import { useFormixContext } from '@euk-labs/formix';
import { FXCheckboxGroup, FXNumericField } from '@euk-labs/formix-mui';
import { Box, Collapse, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

const AddFieldConstraintFields = () => {
  const formixContext = useFormixContext();
  const haveMin = formixContext.getValue('haveMin') as boolean;
  const haveMax = formixContext.getValue('haveMax') as boolean;

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={12}>
        <Collapse unmountOnExit in={haveMin || haveMax}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FXNumericField
                disabled={!haveMin}
                precision={0}
                fullWidth
                name="constraints.min"
                label="Min"
              />
            </Grid>
            <Grid item xs={6}>
              <FXNumericField
                disabled={!haveMax}
                precision={0}
                fullWidth
                name="constraints.max"
                label="Max"
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
      <Grid item xs="auto">
        <Box pt={haveMin || haveMax ? 2 : undefined}>
          <FXCheckboxGroup
            formGroupProps={{ row: true }}
            options={[
              { label: 'Required', name: 'required' },
              { label: 'Min', name: 'haveMin' },
              { label: 'Max', name: 'haveMax' },
            ]}
            label="Constraints"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(AddFieldConstraintFields);
