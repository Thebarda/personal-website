import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './palettes';

import { isDarkTheme, useGetTheme } from "./useGetTheme";

interface Props {
  children: ReactElement;
}

const ThemeProvider: FC<Props> = ({ children }) => {
  const themeMode = useGetTheme();

  const theme = useMemo(() => createTheme(isDarkTheme(themeMode) ? darkTheme : lightTheme), [themeMode]);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </MuiThemeProvider>
  )
}

export default ThemeProvider;