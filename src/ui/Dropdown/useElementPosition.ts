import { useState, useEffect, useCallback, RefObject } from 'react';

export const useElementPosition = <T extends HTMLElement>(elementRef: RefObject<T>): { isInUpperHalf: boolean; isInLowerHalf: boolean } => {
  const [isInUpperHalf, setIsInUpperHalf] = useState(false);
  const [isInLowerHalf, setIsInLowerHalf] = useState(false);

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const { top, bottom } = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    setIsInUpperHalf(top < windowHeight / 2);
    setIsInLowerHalf(bottom > windowHeight / 2);
  }, [elementRef]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isInUpperHalf, isInLowerHalf };
};
