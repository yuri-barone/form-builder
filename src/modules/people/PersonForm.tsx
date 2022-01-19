import { Grid } from '@mui/material';

import FXTextField from '@components/Inputs/FXTextField';

export default function PersonForm() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FXTextField name="name" label="Nome" />
      </Grid>
      <Grid item xs={6}>
        <FXTextField name="identifier" label="Identificador (CPF, CNPJ...)" />
      </Grid>
    </Grid>
  );
}
