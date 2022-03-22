import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

import EntityUpdateWrapper from '@core/components/EntityUpdateWrapper';
import useTranslation from '@core/hooks/useTranslation';

import ProfileCard from '@components/ProfileCard';

import { useUsersRepository } from '@hooks/repositories';
import { useAuthService, useNotificationService } from '@hooks/services';
import { useUserStore } from '@hooks/stores';

import UpdateProfileForm from '@modules/users/components/UpdateProfileForm';

import { useEntity } from '@euk-labs/fetchx';

function Index() {
  const { translate } = useTranslation();
  const notificationService = useNotificationService();
  const authService = useAuthService();
  const userStore = useUserStore();
  const usersRepository = useUsersRepository();
  const userEntity = useEntity(usersRepository, userStore.user?.id);

  async function logoutDevices() {
    const refreshToken = authService.getRefreshToken();

    if (!refreshToken) {
      return notificationService.notify(
        translate('errors.noRefreshToken'),
        'error'
      );
    }

    await notificationService.handleHttpRequest(
      () => usersRepository.logoutDevices(refreshToken),
      {
        feedbackSuccess: translate('feedbacks.logoutDevices'),
        feedbackError: translate('errors.user.logoutDevices'),
      }
    );
  }

  return (
    <Box p={3}>
      <EntityUpdateWrapper entityStore={userEntity}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <ProfileCard />
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {translate('actions.changeProfile')}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <UpdateProfileForm userEntity={userEntity} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5">
                    {translate('common.settings')}
                  </Typography>
                </Grid>

                <Grid item xs={12} display="flex" justifyContent="end">
                  <Button onClick={logoutDevices}>
                    Sair de outros dispositivos
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </EntityUpdateWrapper>
    </Box>
  );
}

export default observer(Index);
