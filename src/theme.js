import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    amarelo: {
      i: '#FFBB00',
      ii: '#FFDD00',
    },
    azul: {
      i: '#002E79',
      ii: '#004893',
      iii: '#005AA5',
      iv: '#2673B3',
      v: '#80ADD2',
      vi: '#E5EEF6',
    },
    cinza: {
      i: '#262626',
      ii: '#757575',
      iii: '#F8F8F8',
      iv: '#CCCCCC',
      v: '#E5E5E5',
      vi: '#DDDDDD',
    },
    status: {
      sucesso: '#39AC3E',
      atencao: '#FFDD00',
      info: '#2673B3',
      erro: '#E53935',
    },
  },
  typography: {
    fontFamily: [
      'geomanistregular',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
