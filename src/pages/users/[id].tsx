import ERROR_MESSAGES from '@config/messages';
import { Box, Grid, Paper } from '@mui/material';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react-lite';
import usersRepository from 'modules/users/repository';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as zod from 'zod';

import FXSubmitButton from '@components/FXSubmitButton';
import FXTextField from '@components/Inputs/FXTextField';

import { Breadcrumb, useUIStore } from '@euk-labs/componentz';
import { useEntity } from '@euk-labs/fetchx';
import { Formix } from '@euk-labs/formix/components';

const UpdateUserSchema = zod.object({
  name: zod.string().min(1, ERROR_MESSAGES.required),
  email: zod.string().email(ERROR_MESSAGES.invalid_email),
});

type UpdateUserSchema = zod.infer<typeof UpdateUserSchema>;

function Index() {
  const uiStore = useUIStore();
  const router = useRouter();
  const { id } = router.query;

  if (Array.isArray(id)) {
    router.replace('/users');
  }

  const userEntity = useEntity(usersRepository, id as string);

  async function handleSubmit(values: UpdateUserSchema) {
    try {
      await userEntity.update(values);
      uiStore.snackbar.show({
        message: 'Usuário atualizado com sucesso!',
        severity: 'success',
      });
    } catch (error) {
      uiStore.snackbar.show({
        message:
          (error as AxiosError).response?.data.message ||
          'Ocorreu um erro ao atualizar o usuário!',
        severity: 'error',
      });
    }
  }

  useEffect(() => {
    if (userEntity.identifier) {
      userEntity.fetch();
    }
  }, [userEntity.identifier]); // eslint-disable-line

  if (userEntity.data && userEntity.identifier) {
    return (
      <Box p={3} mb={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumb />
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Formix
                initialValues={userEntity.data as UpdateUserSchema}
                zodSchema={UpdateUserSchema}
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FXTextField name="name" label="Nome" />
                  </Grid>
                  <Grid item xs={6}>
                    <FXTextField name="email" label="E-mail" />
                  </Grid>

                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <FXSubmitButton label="Salvar" />
                  </Grid>
                </Grid>
              </Formix>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (userEntity.identifier === null || userEntity.loading) {
    return <h1>Loading...</h1>;
  }

  if (userEntity.data === null) {
    return <h1>User not found</h1>;
  }

  return null;
}

export default observer(Index);