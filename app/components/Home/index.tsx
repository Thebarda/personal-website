import {
  Avatar,
  Box,
  Fade,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ScrollContainer from "../Projects/ScrollContainer";
import me from "../../assets/me.jpg";
import me2 from "../../assets/me2.jpg";
import { mainLibraries, softSkills, technicalSkills } from "./skills";

const Home = () => {
  return (
    <ScrollContainer
      position="sticky"
      height="300vh"
      contents={[
        {
          id: "introduction",
          displayAt: 0,
          Content: ({ isVisible }) => (
            <Fade in={isVisible}>
              <Box>
                <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
                  A bit about me
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "0.8fr 1.2fr",
                    justifyItems: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Tom Darneix"
                    src={me}
                    sx={{ width: "30vh", height: "30vh" }}
                  />
                  <Box>
                    <Typography fontFamily="monospace" component="span">
                      Hi, I'm Tom Darneix, Sorry let's fix this nerdy font
                      family...&nbsp;
                    </Typography>
                    <Typography component="span">
                      Here we are! So, I'm a senior frontend developer with a 4
                      years experience with ReactJS. I like to discover new
                      libraries such as Ramda, Jotai, Module Federation and
                      build new code architecture in order to fit with the needs
                      and make the developer experience enjoyable.
                    </Typography>
                    <Typography>
                      Also, I enjoy playing video game, swimming and running.
                    </Typography>
                    <Typography>Scroll down to discover more 😄</Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          ),
        },
        {
          id: "skills",
          displayAt: 0.5,
          Content: ({ isVisible }) => (
            <Fade in={isVisible}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "20vw 20vw 20vw",
                  justifyItems: "end",
                }}
              >
                <Box sx={{ minWidth: "280px" }}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{ marginBottom: 3 }}
                  >
                    Main technical skills
                  </Typography>
                  <Box sx={{ display: "grid", rowGap: 1 }}>
                    {technicalSkills.map(({ name, level }) => (
                      <Box
                        key={name}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "100px 1fr",
                          columnGap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Typography color="text.secondary">{name}</Typography>
                        <LinearProgress
                          value={(level / 10) * 100}
                          variant="determinate"
                          sx={{ width: "100%" }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ marginBottom: 3 }}>
                    Soft skills
                  </Typography>
                  <Box sx={{ display: "grid", rowGap: 1 }}>
                    {softSkills.map((softSkill) => (
                      <Typography key={softSkill}>{softSkill}</Typography>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ marginBottom: 3 }}>
                    Main used libraries
                  </Typography>
                  <Box sx={{ display: "grid", rowGap: 1 }}>
                    {mainLibraries.map(({ name, url }) => (
                      <Link
                        underline="hover"
                        href={url}
                        key={name}
                        color="inherit"
                      >
                        {name}
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Fade>
          ),
        },
        {
          id: "projects",
          displayAt: 1,
          Content: ({ isVisible }) => (
            <Fade in={isVisible}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>Wanna see my personal projects?</Typography>
                  <Link href="/projects" color="inherit">
                    Check out my projects{" "}
                    <ArrowForwardIcon
                      fontSize="small"
                      sx={{ verticalAlign: "middle" }}
                    />
                  </Link>
                </Box>
                <Avatar
                  alt="Tom Darneix"
                  src={me2}
                  sx={{ width: "30vh", height: "30vh" }}
                />
              </Box>
            </Fade>
          ),
        },
      ]}
    />
  );
};

export default Home;
