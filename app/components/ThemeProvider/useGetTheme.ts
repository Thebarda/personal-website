import { useEffect, useState, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { equals } from 'ramda';

import { themeAtom } from "./atoms";
import { ThemeMode } from './models';

export const isDarkTheme = equals<ThemeMode | null>(ThemeMode.Dark);
export const isSystemTheme = equals(ThemeMode.System);

const getSystemTheme = (matches: boolean): ThemeMode => matches ? ThemeMode.Dark : ThemeMode.Light;

export const useGetTheme = (): ThemeMode | null => {
  const theme = useAtomValue(themeAtom);
  const [muiTheme, setMuiTheme] = useState(isSystemTheme(theme) ? null : theme)
  
  const changeSystemTheme = useCallback((matches: boolean) => {
    setMuiTheme(getSystemTheme(matches));
  }, []);
  
  useEffect(() => {
    if (!isSystemTheme(theme)) {
      setMuiTheme(theme);
      return;
    }
    
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    changeSystemTheme(darkThemeMq.matches);
    darkThemeMq.addEventListener('change', (event) => changeSystemTheme(event.matches));

    return () => darkThemeMq.removeEventListener('change', (event) => changeSystemTheme(event.matches));
  }, [theme, changeSystemTheme]);

  return muiTheme;
}