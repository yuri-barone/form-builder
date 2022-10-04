import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { GetStaticProps } from 'next';
import React from 'react';

import AppBar from '@components/AppBar/AppBar';

import { useAppBarStore, useDragStore, useFieldStore } from '@hooks/stores';

import { FieldType } from '@stores/fields';

import AddFieldDialog from '@modules/formBuilder/AddFieldDialog';
import FieldDragOverlay from '@modules/formBuilder/FieldDragOverlay';
import FieldsRenderer from '@modules/formBuilder/FieldsRenderer';
import FieldsWrapper from '@modules/formBuilder/FieldsWrapper';

const isFromFieldType = (x: string | number): x is FieldType => {
  return [
    'TextField',
    'NumericField',
    'DatePicker',
    'DateRangePicker',
    'Autocomplete',
    'MaskedField',
  ].includes(String(x));
};

const FormBuilderIndex = () => {
  const dragStore = useDragStore();
  const fieldStore = useFieldStore();
  const appBarStore = useAppBarStore();

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over?.id === 'fieldsWrapper' && isFromFieldType(e.active.id)) {
      fieldStore.setFieldToInsert(e.active.id);
    }
    dragStore.clearActiveId();
  };

  const handleDragStart = (e: DragStartEvent) => {
    dragStore.setActiveId(e.active.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <AppBar>
        <FieldsWrapper>
          <Box p={2}>
            <FieldsRenderer />
          </Box>
        </FieldsWrapper>
      </AppBar>
      <DragOverlay>
        <FieldDragOverlay appBarOpen={appBarStore.open} activeId={dragStore.activeId} />
      </DragOverlay>
      <AddFieldDialog />
    </DndContext>
  );
};

export default observer(FormBuilderIndex);

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      isPublic: true,
    },
  };
};
