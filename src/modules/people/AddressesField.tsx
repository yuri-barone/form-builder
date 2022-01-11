import ERROR_MESSAGES from '@config/messages';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import FXTextField from '@components/Inputs/FXTextField';

import { useArrayField } from '@euk-labs/formix/hooks';

function AddressesField() {
  const name = 'addresses';
  const { values, helpers } = useArrayField(name);
  const hasValues = values.length > 0;
  const newAddress = {
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  };
  const isLastItem = (index: number) => index === values.length - 1;

  return (
    <Grid container spacing={2}>
      {values.map((_address, index) => (
        <Fragment key={`address-${index}`}>
          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight="bold">
              Endereço {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={3}>
            <FXTextField name={`${name}.${index}.zipcode`} label="CEP" />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.street`} label="Rua" />
          </Grid>
          <Grid item xs={3}>
            <FXTextField name={`${name}.${index}.number`} label="Número" />
          </Grid>
          <Grid item xs={6}>
            <FXTextField
              name={`${name}.${index}.neighborhood`}
              label="Bairro"
            />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.city`} label="Cidade" />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.state`} label="Estado" />
          </Grid>
          <Grid item xs={6}>
            <FXTextField name={`${name}.${index}.country`} label="País" />
          </Grid>

          {!isLastItem(index) && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => helpers.push(newAddress)}>
          <AddIcon />
          Adicionar
        </Button>
      </Grid>

      {!hasValues && (
        <Grid item xs={12}>
          <FormHelperText error>{ERROR_MESSAGES.required}</FormHelperText>
        </Grid>
      )}
    </Grid>
  );
}

export default observer(AddressesField);
