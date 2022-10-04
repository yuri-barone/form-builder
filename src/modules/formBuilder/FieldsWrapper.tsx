import { useDroppable } from '@dnd-kit/core';
import { Box, darken } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { drawerWidth } from '@components/AppBar/utils';

import { useAppBarStore } from '@hooks/stores';

const FieldsWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'fieldsWrapper',
  });
  const { open } = useAppBarStore();

  return (
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
        width: open ? `calc(100% - ${drawerWidth / 1.4}px)` : '100%',
        height: '100%',
      })}
    >
      {children}
    </Box>
  );
};

export default observer(FieldsWrapper);
