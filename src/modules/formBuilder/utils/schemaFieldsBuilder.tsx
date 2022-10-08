import { FXCheckbox, FXNumericField, FXTextField } from '@euk-labs/formix-mui';

import { Field } from '@stores/fields';

export const getSchemaField = (type: Field['type']) => {
  const requiredOption = {
    name: 'required',
    label: 'Required',
    field: FXCheckbox,
    size: 'auto' as const,
  };

  const defaultOptions = [
    {
      name: 'min',
      label: 'Min',
      field: FXNumericField,
      size: 6,
    },
    {
      name: 'max',
      label: 'Max',
      field: FXNumericField,
      size: 6,
    },
  ];

  switch (type) {
    case 'TextField':
      return [...defaultOptions, requiredOption];
    case 'NumericField':
      return [
        ...defaultOptions,
        { name: 'precision', label: 'Precision', field: FXNumericField, size: 12 },
        requiredOption,
      ];
    case 'MaskedField':
      return [
        ...defaultOptions,
        { name: 'mask', label: 'Mask', field: FXTextField, size: 12 },
        requiredOption,
      ];
    case 'DateRangePicker':
      return [
        {
          name: 'startAllowRetroactiveDates',
          label: 'Start Allow Retroactive Dates',
          field: FXCheckbox,
          size: true,
        },
        {
          name: 'endAllowRetroactiveDates',
          label: 'End Allow Retroactive Dates',
          field: FXCheckbox,
          size: true,
        },
        {
          name: 'startAllowFutureDates',
          label: 'Start Allow Future Dates',
          field: FXCheckbox,
          size: true,
        },
        {
          name: 'endAllowFutureDates',
          label: 'End Allow Future Dates',
          field: FXCheckbox,
          size: true,
        },
        requiredOption,
      ];
    case 'DatePicker':
      return [
        {
          name: 'allowRetroactiveDates',
          label: 'Allow Retroactive Dates',
          field: FXCheckbox,
          size: 'auto' as const,
        },
        {
          name: 'allowFutureDates',
          label: 'Allow Future Dates',
          field: FXCheckbox,
          size: 'auto' as const,
        },
        requiredOption,
      ];
    case 'Autocomplete':
      return [requiredOption];

    default:
      return defaultOptions;
  }
};
