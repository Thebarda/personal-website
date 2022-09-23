import type { FC } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { equals, find, gte, isNil, pipe, prop, reverse, sortBy } from "ramda";
import type { SxProps, Theme } from "@mui/system";

export interface Content {
  id: string;
  displayAt: number;
  Content: FC<{ isVisible: boolean }>;
  sx?: SxProps<Theme>;
}

const ScrollContainer: FC<{
  height: string;
  contents: Array<Content>;
  position?: string;
}> = ({ height, contents, position = "fixed" }) => {
  const [displayed, setDisplayed] = useState<string | null>(null);
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const scroll = (): void => {
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

  const containerStyle = equals(position, "fixed")
    ? {
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -100%)",
      }
    : {
        top: "50%",
        left: "50%",
        transform: "translate(-35%, -100%)",
      };

  return (
    <div
      style={{ height: "calc(100vh - 64px)", overflowY: "scroll" }}
      ref={scrollElementRef}
    >
      <div style={{ height }}>
        {contents.map(({ Content, id, sx }) => (
          <Box
            key={id}
            sx={{
              opacity: equals(displayed, id) ? 1 : 0,
              position,
              width: "65vw",
              height: "200px",
              zIndex: equals(displayed, id) ? 1 : 0,
              ...containerStyle,
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
