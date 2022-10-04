import { ChevronLeft, Menu } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import React from 'react';

import { useAppBarStore } from '@hooks/stores';

import DrawerContent from '@modules/formBuilder/DrawerContent';

import { Drawer, DrawerHeader, StyledMuiAppBar } from './utils';

type AppBarProps = {
  children: React.ReactNode;
};

const AppBar = ({ children }: AppBarProps) => {
  const appBarStore = useAppBarStore();

  return (
    <>
      <StyledMuiAppBar open={appBarStore.open}>
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={appBarStore.toggleDrawer}>
              <Menu />
            </IconButton>
            <Image src="/shoulders-logo.svg" alt="Logo" width={50} height={50} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Shoulders - Form Builder
            </Typography>
          </Stack>
        </Toolbar>
      </StyledMuiAppBar>
      <Drawer variant="permanent" open={appBarStore.open}>
        <DrawerHeader>
          <IconButton onClick={appBarStore.toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ overflow: 'auto', overflowX: 'hidden', flexGrow: 1 }}>
          <DrawerContent />
        </Box>
      </Drawer>
      <Box display="flex" justifyContent="flex-end" p={2} pl={10} pt={10} height="100vh">
        {children}
      </Box>
    </>
  );
};

export default observer(AppBar);
