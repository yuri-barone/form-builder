import { Box } from '@mui/material';
import React from 'react';

import { AliasWrapper } from './DrawerContent';
import POSSIBLE_FIELDS from './possibleFields';

type FieldDragOverlayProps = {
  activeId: string | null;
  appBarOpen?: boolean;
};
const FieldDragOverlay = ({ activeId, appBarOpen }: FieldDragOverlayProps) => {
  const field = POSSIBLE_FIELDS.find((field) => field.type === activeId);

  if (!field) return null;

  return (
    <Box sx={(theme) => ({ zIndex: theme.zIndex.tooltip })}>
      {appBarOpen ? field.example : <AliasWrapper>{field.alias}</AliasWrapper>}
    </Box>
  );
};

export default FieldDragOverlay;
