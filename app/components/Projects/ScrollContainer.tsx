import type { FC } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import {
  equals,
  find,
  gte,
  isNil,
  pipe,
  prop,
  propEq,
  reverse,
  sortBy,
} from "ramda";
import type { SxProps, Theme } from "@mui/system";

export interface Content {
  id: string;
  displayAt: number;
  Content: FC<{ isVisible: boolean }>;
  sx?: SxProps<Theme>;
  onClick?: (content: Content) => void;
  url: string;
}

const ScrollContainer: FC<{ height: string; contents: Array<Content> }> = ({
  height,
  contents,
}) => {
  const [displayed, setDisplayed] = useState<string | null>(null);
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const scroll = (): void => {
    console.log("heyyy");
    const totalHeight = scrollElementRef.current?.offsetHeight || 0;
    const scrollHeight = scrollElementRef.current?.scrollTop || 0;
    const scrollPosition = scrollHeight / totalHeight;

    const contentIds = pipe(
      sortBy(prop("displayAt")),
      reverse<Content>
    )(contents);

    const displayedContent = find(
      ({ displayAt }): boolean => gte(scrollPosition, displayAt),
      contentIds
    ) as Content;

    setDisplayed(prop("id", displayedContent));
  };

  useEffect(() => {
    if (isNil(scrollElementRef.current)) {
      return;
    }

    scrollElementRef.current?.addEventListener("scroll", scroll);

    scroll();

    return () => {
      scrollElementRef.current?.removeEventListener("scroll", scroll);
    };
  }, [scrollElementRef.current]);

  return (
    <div
      style={{ height: "100vh", overflowY: "scroll" }}
      ref={scrollElementRef}
    >
      <div style={{ height }}>
        {contents.map(({ Content, id, sx }) => (
          <Box
            key={id}
            sx={{
              opacity: equals(displayed, id) ? 1 : 0,
              position: "fixed",
              width: "65vw",
              height: "200px",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -100%)",
              zIndex: equals(displayed, id) ? 1 : 0,
            }}
          >
            <Box sx={{ ...sx }}>
              <Content key={id} isVisible={equals(displayed, id)} />
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ScrollContainer;
