import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // main: '#81dba5',
      //blue
      // main: '#247dad'
      //cream
      bg: '#edf2f5',
      // main: '#79c5ed',
      main: '#59dee3',
      graybg: '#e6e6e6'


    },
    secondary: {
      main: '#4caf50',
      //main: '#4e368a',
    },
    // primary: {
    //   main: '#3c2fa8',
    //   light: '#42a5f5',
    //   dark: '#42a5f5',
    //   contrastText: '#4d4b47'
    // },
    // secondary: {
    //   main: '#1b6945',
    //   light: '#42a5f5',
    //   dark: '#42a5f5',
    //   contrastText: '#4d4b47'
    // },
    // background: {
    //   lowest: '#2b2a27',
    //   green: '#1e331d'
    // },
    // contrastThreshold: 0,
    // tonalOffset: 0.2,
  },
  typography: {
    allVariants: {
      color: '#000000'
    }
  }
});

export default theme;