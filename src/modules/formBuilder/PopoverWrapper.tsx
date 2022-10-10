import { Formix } from '@euk-labs/formix';
import { FXSubmitButton, FXTextField } from '@euk-labs/formix-mui';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  Popover,
  SpeedDialIcon,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';

import { useFieldStore } from '@hooks/stores';

import { zodValidator } from '@utils/zodValidator';

import { addFieldInitialValues } from './AddFieldDialog';
import { EditFieldValues, editFieldSchema } from './schemas/editField.schema';
import { parseFieldStoreToValues, parseFieldValuesToStore } from './utils/parseValues';
import { getAdvancedFieldPrecision, getSchemaField } from './utils/schemaFieldsBuilder';

type FieldPopoverWrapperProps = {
  children: React.ReactNode;
  onOpen: () => void;
};

const FieldPopoverWrapper = ({ children, onOpen }: FieldPopoverWrapperProps) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const fieldStore = useFieldStore();
  const [open, setOpen] = React.useState(false);
  const [openAdvanced, setOpenAdvanced] = React.useState(false);
  const schemaBuilder = fieldStore.fieldToEdit && getSchemaField(fieldStore.fieldToEdit.type);
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
      <Popover open={open} anchorEl={boxRef.current} onClose={handleClose}>
        <Box p={2} width="40vw">
          {fieldStore.fieldToEdit && (
            <Formix
              initialValues={initialValues}
              validate={zodValidator(editFieldSchema)}
              onSubmit={handleFieldEdit}
            >
              <Grid container spacing={2} justifyContent="space-between">
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
                <Grid item xs={12}>
                  <Collapse in={openAdvanced} unmountOnExit>
                    {schemaBuilder && (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">Validations</Typography>
                        </Grid>
                        {schemaBuilder.map((option) => (
                          <Grid item xs={option.size} key={option.name}>
                            <option.field
                              precision={getAdvancedFieldPrecision(option.name)}
                              fullWidth
                              name={option.name}
                              label={option.label}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Collapse>
                </Grid>
                <Grid item xs={12} sm="auto" alignSelf="flex-start">
                  <Button
                    variant="outlined"
                    onClick={() => setOpenAdvanced(!openAdvanced)}
                    endIcon={<SpeedDialIcon open={openAdvanced} />}
                  >
                    {openAdvanced ? 'Hide advanced' : 'Show advanced'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Grid container spacing={2}>
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
