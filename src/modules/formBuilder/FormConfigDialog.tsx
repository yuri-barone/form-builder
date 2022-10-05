import { Checkbox } from '@euk-labs/componentz';
import { Breakpoint, Button, Dialog, Grid, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import React from 'react';

import Radio from '@components/form/Radio';

import { useFormConfigStore } from '@hooks/stores';

const isBreakpoint = (x: string): x is Breakpoint => {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(x);
};

const FormConfigDialog = () => {
  const formConfigStore = useFormConfigStore();
  const bp = formConfigStore.breakpoint;

  const handleClose = () => {
    formConfigStore.setOpen(false);
  };

  const handleChangeBP = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isBreakpoint(e.target.value)) {
      formConfigStore.setBreakpoint(e.target.value);
    }
  };

  const handleGenerateCypressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formConfigStore.setGenerateCypress(e.target.checked);
  };

  const handleFormTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    formConfigStore.setFormTitle(e.target.value);
  };

  return (
    <Dialog open={formConfigStore.open} onClose={handleClose}>
      <Box p={2}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Form Config
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary">
              Screen Size View
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs>
                <Image src="/xl.svg" height={100} width="100%" alt="xl" />
                <Radio onChange={handleChangeBP} label="XL" value="xl" checked={bp === 'xl'} />
              </Grid>
              <Grid item xs>
                <Image src="/lg.svg" height={100} width="100%" alt="lg" />
                <Radio onChange={handleChangeBP} label="LG" value="lg" checked={bp === 'lg'} />
              </Grid>
              <Grid item xs>
                <Image src="/md.svg" height={100} width="100%" alt="md" />
                <Radio onChange={handleChangeBP} label="MD" value="md" checked={bp === 'md'} />
              </Grid>
              <Grid item xs>
                <Image src="/sm.svg" height={100} width="100%" alt="sm" />
                <Radio onChange={handleChangeBP} label="SM" value="sm" checked={bp === 'sm'} />
              </Grid>
              <Grid item xs>
                <Image src="/xs.svg" height={100} width="100%" alt="xs" />
                <Radio onChange={handleChangeBP} label="XS" value="xs" checked={bp === 'xs'} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Form title"
              autoFocus
              fullWidth
              value={formConfigStore.formTitle}
              onChange={handleFormTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <Checkbox
              label="Generate Cypress Test"
              onChange={handleGenerateCypressChange}
              checked={formConfigStore.generateCypress}
            />
          </Grid>
          <Grid item xs="auto">
            <Stack spacing={2} direction="row">
              <Button color="primary" variant="contained" onClick={handleClose}>
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default observer(FormConfigDialog);
