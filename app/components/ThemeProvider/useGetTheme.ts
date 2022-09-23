import { useLayoutEffect, useState, useCallback } from "react";
import { equals } from "ramda";

import { ThemeMode } from "./models";

export const isDarkTheme = equals<ThemeMode | null>(ThemeMode.Dark);
export const isSystemTheme = equals(ThemeMode.System);

const getSystemTheme = (matches: boolean): ThemeMode =>
  matches ? ThemeMode.Dark : ThemeMode.Light;

export const useGetTheme = (): ThemeMode | null => {
  const [muiTheme, setMuiTheme] = useState<ThemeMode | null>(null);

  const changeSystemTheme = useCallback((matches: boolean) => {
    setMuiTheme(getSystemTheme(matches));
  }, []);

  useLayoutEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    changeSystemTheme(darkThemeMq.matches);
    darkThemeMq.addEventListener("change", (event) =>
      changeSystemTheme(event.matches)
    );

    return () =>
      darkThemeMq.removeEventListener("change", (event) =>
        changeSystemTheme(event.matches)
      );
  }, []);

  return muiTheme;
};
