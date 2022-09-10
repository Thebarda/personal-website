import type { FC } from 'react';
import { useEffect, useRef} from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import { equals, find, gte, isNil, pipe, prop, reverse, sortBy } from 'ramda';
import type { SxProps, Theme } from '@mui/system';

interface Content {
  id: string;
  displayAt: number;
  Content: FC<{ isVisible: boolean }>;
  sx?: SxProps<Theme>;
}

const ScrollContainer: FC<{ height: string; contents: Array<Content> }> = ({ height, contents }) => {
  const [displayed, setDisplayed] = useState<string | null>(null);
  const scrollElementRef = useRef<HTMLDivElement | null>(null);

  const scroll = ({ totalHeight, scrollHeight }): void => {
    // const totalHeight = event.currentTarget.offsetHeight;
    // const scrollHeight = event.currentTarget.scrollTop;

    const scrollPosition = scrollHeight / totalHeight;

    const contentIds = pipe(sortBy(prop('displayAt')), reverse<Content>)(contents);

    const displayedContent = find(({ displayAt }): boolean => gte(scrollPosition, displayAt), contentIds) as Content;

    setDisplayed(prop('id', displayedContent));
  }

  useEffect(() => {
    if (isNil(scrollElementRef.current)) {
      return;
    }

    scroll({ totalHeight: scrollElementRef.current.offsetHeight, scrollHeight: scrollElementRef.current.scrollTop })
  }, [scrollElementRef.current]);

  return (
    <div>
      {contents.map(({ Content, id, sx }) => (
        <Box key={id} sx={{ width: '100%', height: '100vh', opacity: equals(displayed, id) ? 1 : 0, transition: "opacity 350ms ease-out", position: 'absolute' }}>
          <Box sx={{ position: 'fixed', width: '100%', height: '100vh', ...sx }}>
            <Content key={id} isVisible={equals(displayed, id)} />
          </Box>
        </Box>
      ))}
      <Box sx={{ width: '100%', height: '100vh', overflowY: 'scroll', position: 'relative' }} onScroll={({ currentTarget}) => scroll({ totalHeight: currentTarget.offsetHeight, scrollHeight: currentTarget.scrollTop })} ref={scrollElementRef}>
        <Box sx={{ width: '100%', height }} />
      </Box>
    </div>
    
  )
}

export default ScrollContainer;