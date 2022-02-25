import { Box, Button, Grid, Typography } from '@mui/material';

import TabPanel from '@components/TabPanel';
import Trans from '@components/Trans';

import useTranslation from '@hooks/useTranslation';

import { FXTextField } from '@euk-labs/formix-mui';

interface TextFilterProps {
  name: string;
  activeTab: number;
  index: number;
}

export default function TextFilter({
  name,
  activeTab,
  index,
}: TextFilterProps) {
  const { translate } = useTranslation();

  return (
    <TabPanel value={activeTab} index={index}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <Trans id="filters.text.title" />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FXTextField
              name={name}
              label={translate('filters.text.label')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              <Trans id="actions.filters.submit" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
}
