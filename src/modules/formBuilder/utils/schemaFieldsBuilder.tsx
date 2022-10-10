import { FXCheckbox, FXNumericField, FXTextField } from '@euk-labs/formix-mui';

import { Field } from '@stores/fields';

export const getSchemaField = (type: Field['type']) => {
  const requiredOption = {
    name: 'validations.required',
    label: 'Required',
    field: FXCheckbox,
    size: 'auto' as const,
  };

  const defaultOptions = [
    {
      name: 'validations.min',
      label: 'Min',
      field: FXNumericField,
      size: 6,
    },
    {
      name: 'validations.max',
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
        { name: 'options.precision', label: 'Precision', field: FXNumericField, size: 12 },
        requiredOption,
      ];
    case 'MaskedField':
      return [
        ...defaultOptions,
        { name: 'options.mask', label: 'Mask', field: FXTextField, size: 12 },
        requiredOption,
      ];
    case 'DateRangePicker':
      return [
        {
          name: 'validations.startAllowRetroactiveDates',
          label: 'Start Allow Retroactive Dates',
          field: FXCheckbox,
          size: true,
        },
        {
          name: 'validations.endAllowRetroactiveDates',
          label: 'End Allow Retroactive Dates',
          field: FXCheckbox,
          size: true,
        },
        {
          name: 'validations.startAllowFutureDates',
          label: 'Start Allow Future Dates',
          field: FXCheckbox,
          size: true,
        },
        {
          name: 'validations.endAllowFutureDates',
          label: 'End Allow Future Dates',
          field: FXCheckbox,
          size: true,
        },
        requiredOption,
      ];
    case 'DatePicker':
      return [
        {
          name: 'validations.allowRetroactiveDates',
          label: 'Allow Retroactive Dates',
          field: FXCheckbox,
          size: 'auto' as const,
        },
        {
          name: 'validations.allowFutureDates',
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
