import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Cria a instância do tema.
const theme = createTheme({
  palette: {
    primary: {
      main: '#7d1b2e',
    },
    secondary: {
      main: '#f7963b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;

/*
Palette colors:
#7d1b2e
#f7963b
#d42938
#4b1127
#040404
#543c14
#510d34
#2a1c0c
#1f1205
#0c0c1c

*/