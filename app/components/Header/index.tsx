import type { FC } from 'react';
import { ButtonGroup, Button, AppBar, Toolbar, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ContrastIcon from '@mui/icons-material/Contrast';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from './useTheme';
import { ThemeMode } from '../ThemeProvider/models';

const Header: FC = () => {
  const { changeTheme, isChangingTheme, getButtonStyle } = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: '1' }}>Tom Darneix</Typography>
        <ButtonGroup color="inherit" disabled={isChangingTheme}>
          <Button startIcon={<WbSunnyIcon />} sx={getButtonStyle(ThemeMode.Light)} onClick={changeTheme(ThemeMode.Light)}>Light</Button>
          <Button startIcon={<ContrastIcon />} sx={getButtonStyle(ThemeMode.System)} onClick={changeTheme(ThemeMode.System)}>System</Button>
          <Button startIcon={<DarkModeIcon />} sx={getButtonStyle(ThemeMode.Dark)} onClick={changeTheme(ThemeMode.Dark)}>Dark</Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
