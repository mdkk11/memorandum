import { useState, useEffect, useCallback, RefObject } from 'react';

export const useFixedElementPosition = <T extends HTMLElement>(elementRef: RefObject<T>) => {
  const [fixedPosition, setFixedPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const updatePosition = useCallback(() => {
    if (!elementRef.current) return;

    const { top, left } = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const newTop = Math.max(0, Math.min(windowHeight - elementRef.current.clientHeight, top));
    const newLeft = Math.max(0, Math.min(windowWidth - elementRef.current.clientWidth, left));

    setFixedPosition({ top: newTop, left: newLeft });
  }, [elementRef]);

  useEffect(() => {
    updatePosition();

    const handleScroll = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);

  return fixedPosition;
};
