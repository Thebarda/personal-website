import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { useState, useEffect, useRef } from 'react';
import { isNil, lt } from 'ramda';

interface UseIntersectionObserverState {
  isVisible: boolean;
  setElement: Dispatch<SetStateAction<MutableRefObject<HTMLDivElement> | null>>;
}

export const useIntersectionObserver = (): UseIntersectionObserverState => {
  const [element, setElement] = useState<MutableRefObject<HTMLDivElement> | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver>(null);
  
  const handleIntersect = (entries: Array<IntersectionObserverEntry>) => {
    console.log(entries[0].intersectionRatio)
    if (lt(entries[0].intersectionRatio, 0.95)) {
      setIsVisible(false);
      return;
    }
  
    setIsVisible(true);
  }

  useEffect(() => {
    if (isNil(element)) {
      observer.current?.disconnect();
      return;
    }

    observer.current = new IntersectionObserver(handleIntersect, { threshold: [0.95] });
    observer.current.observe(element);

    return () => {
      observer.current?.disconnect();
      setElement(null);
    }
  }, [element]);

  return {
    setElement,
    isVisible,
  }
}