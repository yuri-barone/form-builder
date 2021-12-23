import Grid from '@mui/material/Grid';
import RecoverPasswordForm from 'modules/login/RecoverPasswordForm';
import type { NextPage } from 'next';

import LoginBanner from '@components/Login/LoginBanner';

const RecoverPassword: NextPage = () => {
  return (
    <Grid container minHeight="100vh">
      <Grid
        item
        xs={6}
        display={{
          xs: 'none',
          md: 'block',
        }}
      >
        <LoginBanner />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <RecoverPasswordForm />
      </Grid>
    </Grid>
  );
};

export default RecoverPassword;

export const getStaticProps = async () => {
  return {
    props: {
      showAppBar: false,
    },
  };
};