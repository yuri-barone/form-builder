import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';

import baseTheme from '@styles/base.theme';

interface ThemeProviderProps {
  children?: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = createTheme(baseTheme);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default observer(ThemeProvider);
