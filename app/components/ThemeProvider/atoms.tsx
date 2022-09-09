import { atom } from 'jotai';
import { ThemeMode } from './models';

export const themeAtom = atom(ThemeMode.System);