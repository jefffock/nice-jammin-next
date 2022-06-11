import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3c2fa8',
    },
    secondary: {
      main: '#1b6945',
    },
    // contrastThreshold: 3,
    // tonalOffset: 0.2,
  },
});