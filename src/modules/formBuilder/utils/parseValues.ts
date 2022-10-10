import { Field, GridSize } from '@stores/fields';

import { AddFieldValues } from '../schemas/addField.schema';

const isFromGridSizeString = (x: string): x is 'auto' | 'true' => {
  return ['auto', 'true'].includes(x);
};

const isFromGridSizeNumber = (
  x: string
): x is '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' => {
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].includes(x);
};

const validateGridSize = (gridSize: string | undefined | null): GridSize => {
  if (!gridSize) return null;

  if (isFromGridSizeString(gridSize)) return gridSize;
  if (isFromGridSizeNumber(gridSize)) return parseInt(gridSize);

  return null;
};

export const parseFieldValuesToStore = (field: AddFieldValues): Omit<Field, 'type' | 'id'> => {
  return {
    ...field,
    gridSize: {
      xs: validateGridSize(field.gridSize?.xs),
      sm: validateGridSize(field.gridSize?.sm),
      md: validateGridSize(field.gridSize?.md),
      lg: validateGridSize(field.gridSize?.lg),
      xl: validateGridSize(field.gridSize?.xl),
    },
  };
};

export const parseFieldStoreToValues = (field: Omit<Field, 'type' | 'id'>): AddFieldValues => {
  return {
    ...field,
    gridSize: {
      xs: field.gridSize?.xs?.toString(),
      sm: field.gridSize?.sm?.toString(),
      md: field.gridSize?.md?.toString(),
      lg: field.gridSize?.lg?.toString(),
      xl: field.gridSize?.xl?.toString(),
    },
  };
};
