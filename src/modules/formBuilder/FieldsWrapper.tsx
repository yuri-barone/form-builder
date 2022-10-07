import { useDroppable } from '@dnd-kit/core';
import { Box, Breakpoint, darken } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { drawerWidth } from '@components/AppBar/utils';

import { useAppBarStore, useFormConfigStore } from '@hooks/stores';

const scaleByBreakpoint = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'xs':
      return 0.5;
    case 'sm':
      return 0.75;
    case 'md':
      return 1;
    case 'lg':
      return 1.25;
    case 'xl':
      return 1.5;
  }
};

const widthByBreakpoint = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'xs':
      return 375;
    case 'sm':
      return 600;
    case 'md':
      return 960;
    case 'lg':
      return 1280;
    case 'xl':
      return 1920;
  }
};

const FieldsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'fieldsWrapper',
  });
  const { breakpoint } = useFormConfigStore();
  const { open } = useAppBarStore();
  const needsDrawer = open && breakpoint && !['xs', 'sm', 'md'].includes(breakpoint);
  const width = breakpoint && widthByBreakpoint(breakpoint);

  return (
    <Box
      display="flex"
      justifyContent="center"
      width={open ? `calc(100% - ${drawerWidth}px)` : '100%'}
      sx={(theme) => ({
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      })}
    >
      <Box
        ref={setNodeRef}
        sx={(theme) => ({
          border: isOver
            ? `1px dashed ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.primary.main}`,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: isOver
            ? darken(theme.palette.background.paper, 0.1)
            : theme.palette.background.paper,
          transition: theme.transitions.create(['width', 'background', 'border'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: open ? (needsDrawer ? `calc(100% + ${drawerWidth * 50}px)` : width) : width,
          height: '100%',
          scale: breakpoint ? scaleByBreakpoint(breakpoint) : undefined,
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default observer(FieldsWrapper);
