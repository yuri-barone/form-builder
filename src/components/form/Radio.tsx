import { Radio as MuiRadio, Stack, Typography } from '@mui/material';
import React from 'react';

type RadioProps = {
  value: string;
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio = ({ value, label, checked, onChange }: RadioProps) => {
  return (
    <Stack spacing={1} alignItems="center" direction="row">
      <MuiRadio value={value} checked={checked} onChange={onChange} />
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default Radio;
