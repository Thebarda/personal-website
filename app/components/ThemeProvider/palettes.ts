import type { ThemeOptions, Components, Theme } from '@mui/material';

const components: Components<Omit<Theme, "components">> = {
  MuiPaper: {
      defaultProps: {
        variant: 'outlined'
      },
    },
}

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4b1bd0',
    },
    secondary: {
      main: '#c0ca33',
    },
  },
  components,
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#7E59C0',
    },
    secondary: {
      main: '#dce775',
    },
  },
  components,
};