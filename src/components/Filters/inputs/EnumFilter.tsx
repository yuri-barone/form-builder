import { Box, Button, Grid } from '@mui/material';
import { useMemo } from 'react';

import TabPanel from '@components/TabPanel';

import { FXCheckboxGroup } from '@euk-labs/formix-mui';

import { FilterEnum } from '../types';

interface EnumFilterProps {
  name: string;
  activeTab: number;
  index: number;
  options: FilterEnum[];
}

export default function EnumFilter({
  name,
  activeTab,
  index,
  options,
}: EnumFilterProps) {
  const checkboxOptions = useMemo(
    () =>
      options.map((option) => ({
        name: option.value,
        label: option.value,
      })),
    [options]
  );

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FXCheckboxGroup
              label="Escolha as opções"
              options={checkboxOptions}
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Aplicar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}