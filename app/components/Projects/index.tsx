import { Box, Typography, List, ListItem, ListItemText, Zoom } from '@mui/material';
import type { FC } from 'react';
import ScrollContainer from './ScrollContainer';

const projects = [
  {
    name: "Personal website",
    url: "https://personal-website-thebarda.vercel.app/",
    color: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
    stack: ['Remix', "React", 'Ramda', 'Material UI', 'ESLint', 'Vercel', 'Checkly'],
  },
  {
    name: "Thebardabot",
    url: "https://thebardabot.vercel.app/?parent=personal-website-thebarda.vercel.app",
    color: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
    stack: ["React", "tmi.js", "Material UI", "Vercel", "Ramda", "Fetch"],
  }
];

const Projects: FC = () => {

  return (
    <ScrollContainer
      height='200vh'
      contents={
        projects.map(({ name, color, url, stack }, index) => ({
          id: name,
          displayAt: index / 2,
          Content: ({ isVisible }) => (
            <Zoom in={isVisible} >
              <Box sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center', height: '100%', color: 'common.black' }}>
                <Box sx={{ display: 'grid', justifyItems: 'center', rowGap: 3 }}>
                  <Typography variant="h5" fontWeight="bold">{name}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 3 }}>
                    <iframe style={{ width: '50vw', height: '50vh', borderStyle: 'none', borderRadius: 8 }} src={url} title={name} />
                    <Box>
                      <Typography variant="h5" fontWeight="bold">Stack</Typography>
                      <List>
                        {stack.map((tech) => (
                          <ListItem key={tech}>
                            <ListItemText primary={tech} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Zoom>
          ),
          sx: {
            backgroundImage: color,
          }
        }))
      }
    />
  )
}

export default Projects;