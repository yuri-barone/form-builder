import { ThemeOptions, darken } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    primaryGradient: string;
  }

  interface PaletteOptions {
    primaryGradient?: string;
  }
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: blue[700],
    },
    secondary: {
      main: '#3AA3F8',
    },
    background: {
      default: darken(grey[900], 0.5),
      paper: darken(grey[900], 0.2),
    },
    primaryGradient: 'linear-gradient(225deg, rgba(48,141,219,1) 0%, rgba(12,62,114,1) 100%)',
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: darken(grey[900], 0.5),
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: '0.6em',
          backgroundColor: grey[300],
        },
        '::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(225deg, rgba(48,141,219,1) 0%, rgba(12,62,114,1) 100%)',
          borderRadius: 16,
        },
        '::-webkit-scrollbar:horizontal': {
          height: 5,
        },
      },
    },
  },
};

export default baseTheme;
