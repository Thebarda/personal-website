import type { FC } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from '@remix-run/react';

const WebLink: FC<{ to: string; content: string }> = ({ to, content }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Typography component="span" variant="h6" sx={{ color: 'text.primary' }}>{content}</Typography>
  </Link>
)

const Header: FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <WebLink to="/" content="Tom Darneix" />
        </Box>
        <WebLink to="/projects" content="Projects" />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
