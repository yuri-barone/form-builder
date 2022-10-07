import { ChevronLeft, DoneAll, Menu, Settings } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import React from 'react';

import { useAppBarStore, useFormConfigStore } from '@hooks/stores';

import DrawerContent from '@modules/formBuilder/DrawerContent';

import { Drawer, DrawerHeader, StyledMuiAppBar } from './utils';

type AppBarProps = {
  children: React.ReactNode;
};

const AppBar = ({ children }: AppBarProps) => {
  const appBarStore = useAppBarStore();
  const formConfigStore = useFormConfigStore();

  const handleOpenFormConfig = () => {
    formConfigStore.setOpen(true);
  };

  const handleFormSubmit = () => {
    formConfigStore.submit();
  };

  return (
    <>
      <StyledMuiAppBar open={appBarStore.open}>
        <Box p={1} pl={1.5} pr={1.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={appBarStore.toggleDrawer}>
                  <Menu />
                </IconButton>
                <Image src="/shoulders-logo.svg" alt="Logo" width={50} height={50} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Shoulders - Form Builder
                </Typography>
              </Stack>
            </Box>
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={handleFormSubmit}>
                <DoneAll />
              </IconButton>
              <IconButton onClick={handleOpenFormConfig}>
                <Settings />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
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
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
        pl={appBarStore.open ? undefined : 10}
        pt={10}
        height="100vh"
      >
        {children}
      </Box>
    </>
  );
};

export default observer(AppBar);
