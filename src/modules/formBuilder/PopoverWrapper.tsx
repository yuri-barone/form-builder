import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Popover } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { useFieldStore } from '@hooks/stores';

import { zodValidator } from '@utils/zodValidator';

import { addFieldInitialValues } from './AddFieldDialog';
import { parseFieldStoreToValues, parseFieldValuesToStore } from './parseValues';
import { EditFieldValues, editFieldSchema } from './schemas/editField.schema';

type FieldPopoverWrapperProps = {
  children: React.ReactNode;
  onOpen: () => void;
};

const FieldPopoverWrapper = ({ children, onOpen }: FieldPopoverWrapperProps) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const fieldStore = useFieldStore();
  const [open, setOpen] = React.useState(false);
  const initialValues = fieldStore.fieldToEdit
    ? parseFieldStoreToValues(fieldStore.fieldToEdit)
    : addFieldInitialValues;

  const handleClose = () => {
    setOpen(false);
    fieldStore.setFieldToEdit(null);
  };

  const handleMouseClick = (e: React.MouseEvent) => {
    if (e.button === 2) {
      onOpen();
      setOpen(true);
    }
  };

  const handleFieldDelete = () => {
    if (fieldStore.fieldToEdit) {
      fieldStore.deleteField(fieldStore.fieldToEdit.id);
      handleClose();
    }
  };

  const handleFieldEdit = (values: EditFieldValues) => {
    if (fieldStore.fieldToEdit) {
      const correctValues = parseFieldValuesToStore(values);
      fieldStore.editField(correctValues);
      handleClose();
    }
  };

  const handleFieldMoveDown = () => {
    if (fieldStore.fieldToEdit) {
      fieldStore.moveFieldDown(fieldStore.fieldToEdit.id);
    }
  };

  const handleFieldMoveUp = () => {
    if (fieldStore.fieldToEdit) {
      fieldStore.moveFieldUp(fieldStore.fieldToEdit.id);
    }
  };

  useEffect(() => {
    boxRef.current?.addEventListener('contextmenu', () => {
      console.log('minha pica');
      return false;
    });

    return () => {
      boxRef.current?.removeEventListener('contextmenu', () => {
        return false;
      });
    };
  }, []);

  return (
    <>
      <Box onContextMenu={(e) => e.preventDefault()} onMouseDown={handleMouseClick} ref={boxRef}>
        {children}
      </Box>
      <Popover
        open={open}
        anchorEl={boxRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Box p={2} width="30vw">
          {fieldStore.fieldToEdit && (
            <Formix
              initialValues={initialValues}
              validate={zodValidator(editFieldSchema)}
              onSubmit={handleFieldEdit}
            >
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12}>
                  <FXTextField name="name" label="Name" />
                </Grid>
                <Grid item xs={12}>
                  <FXTextField name="label" label="Label" />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <FXTextField name="gridSize.xs" label="XS" />
                    </Grid>
                    <Grid item xs>
                      <FXTextField name="gridSize.sm" label="SM" />
                    </Grid>
                    <Grid item xs>
                      <FXTextField name="gridSize.md" label="MD" />
                    </Grid>
                    <Grid item xs>
                      <FXTextField name="gridSize.lg" label="LG" />
                    </Grid>
                    <Grid item xs>
                      <FXTextField name="gridSize.xl" label="XL" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <IconButton onClick={handleFieldMoveUp}>
                    <ArrowUpward />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <IconButton onClick={handleFieldMoveDown}>
                    <ArrowDownward />
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Button variant="outlined" onClick={handleFieldDelete}>
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <FXSubmitButton label="Save" />
                </Grid>
              </Grid>
            </Formix>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default observer(FieldPopoverWrapper);
