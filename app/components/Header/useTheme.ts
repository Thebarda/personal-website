import { useTransition, useCallback } from 'react';
import { useAtom } from 'jotai';
import { equals } from 'ramda';
import type { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material';

import { themeAtom } from "../ThemeProvider/atoms";
import type { ThemeMode } from '../ThemeProvider/models';

interface UseThemeState {
  theme: ThemeMode;
  changeTheme: (theme: ThemeMode) => () => void;
  isChangingTheme: boolean;
  getButtonStyle: (themeMode: ThemeMode) => SxProps<Theme>;
}

export const useTheme = (): UseThemeState => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [isChangingTheme, startTransition] = useTransition();

  const changeTheme = useCallback((themeMode: ThemeMode) => (): void => {
    if (equals(themeMode, theme)) {
      return;
    }

    startTransition(() => setTheme(themeMode));
  }, [theme, setTheme]);

  const isSelectedTheme = useCallback((currentTheme: ThemeMode) => {
    return equals(currentTheme, theme)
  }, [theme]);

  const getButtonStyle = (themeMode: ThemeMode) => [
    (muiTheme: Theme) => ({
      backgroundColor: isSelectedTheme(themeMode) ? alpha(muiTheme.palette.common.white, 0.3) : undefined
    })
  ]

  return {
    theme,
    changeTheme,
    isChangingTheme,
    getButtonStyle
  }
} 