import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box, Grid, styled } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useAppBarStore } from '@hooks/stores';

import POSSIBLE_FIELDS, { Field } from './possibleFields';

type RenderFieldProps = {
  field: Field;
  appBarOpen?: boolean;
};

export const AliasWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  height: theme.spacing(6),
  width: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: theme.spacing(1),
}));

const RenderField = ({ field, appBarOpen }: RenderFieldProps) => {
  const { setNodeRef, transform, attributes, listeners } = useDraggable({
    id: field.type,
  });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        cursor: 'pointer',
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
      title={field.title}
    >
      {appBarOpen ? field.example : <AliasWrapper>{field.alias}</AliasWrapper>}
    </Box>
  );
};

const DrawerContent = () => {
  const { open } = useAppBarStore();
  return (
    <Box p={1} pt={2}>
      <Grid container spacing={2}>
        {POSSIBLE_FIELDS.map((field, index) => (
          <Grid item xs={12} key={`${field.title}-${index}`}>
            <RenderField appBarOpen={open} field={field} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default observer(DrawerContent);
