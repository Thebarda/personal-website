import { Box, Typography, List, ListItem, ListItemText, Zoom } from '@mui/material';
import type { FC } from 'react';
import type { Content } from './ScrollContainer';
import ScrollContainer from './ScrollContainer';
import guess from '../../assets/guess.png';
import personal from '../../assets/personal.png';
import thebardabot from '../../assets/thebardabot.png';

const projects = [
  {
    name: "Personal website",
    url: "https://personal-website-thebarda.vercel.app/projects",
    color: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
    stack: ['Remix', "React", 'Ramda', 'Material UI', 'ESLint', 'Vercel', 'Checkly'],
    img: personal,
  },
  {
    name: "Thebardabot",
    url: "https://thebardabot.vercel.app/",
    color: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
    stack: ["React", "tmi.js", "Material UI", "Vercel", "Ramda", "Fetch"],
    img: thebardabot,
  },
  {
    name: "Guess the translation",
    url: "https://guess-the-translation.vercel.app/",
    color: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    stack: ["React", "Jotai", "Material UI", "Vercel", "Ramda", 'Local storage'],
    img: guess,
  }
];

const Projects: FC = () => {

  return (
    <ScrollContainer
      height='300vh'
      contents={
        projects.map(({ name, color, url, stack, img }, index) => ({
          id: name,
          displayAt: index / 2,
          url,
          Content: ({ isVisible }) => (
            <Zoom in={isVisible} >
              <Box sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center', height: '100%', color: 'common.black', zIndex: 50 }}>
                <Box sx={{ display: 'grid', justifyItems: 'center', rowGap: 3 }}>
                  <Typography variant="h5" fontWeight="bold">{name}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 3 }}>
                    <img  style={{ width: '50vw', height: '50vh', borderStyle: 'none', borderRadius: 8, objectFit: 'cover' }} src={img} alt={name} />
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
          },
          onClick: ({ url }: Content) => {
            console.log(url)
            window.open(url, '_blank', 'noopener noreferrer');
          }
        }))
      }
    />
  )
}

export default Projects;