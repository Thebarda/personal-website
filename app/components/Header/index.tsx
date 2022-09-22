import type { FC } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "@remix-run/react";

const WebLink: FC<{ to: string; content: string; id: string }> = ({
  to,
  content,
  id,
}) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <Typography
      component="span"
      variant="h6"
      sx={{ color: "common.white" }}
      id={id}
    >
      {content}
    </Typography>
  </Link>
);

const Header: FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <WebLink to="/" content="Tom Darneix" id="home" />
        </Box>
        <WebLink to="/projects" content="Projects" id="projects" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
