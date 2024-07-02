import React, { ElementRef, useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useNavigationCollapsed } from './useNavigationCollapsed';

const Width = {
  min: 240,
  max: 480,
} as const;

/**
 * @package
 */
export const useNavigation = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = useState(false);
  const { isCollapsed, setIsCollapsed } = useNavigationCollapsed();

  const handleMouseUp = useCallback(() => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      isResizingRef.current = true;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseUp]
  );

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < Width.min) newWidth = Width.min;
    if (newWidth > Width.max) newWidth = Width.max;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : `${Width.min}px`;
      navbarRef.current.style.setProperty('width', '0');

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile, setIsCollapsed]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '0px');
      setTimeout(() => setIsResetting(false), 300);
    }
  }, [setIsCollapsed]);

  useEffect(() => {
    setIsCollapsed(isMobile);
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth, collapse, setIsCollapsed]);

  return {
    sidebarRef,
    navbarRef,
    isMobile,
    isCollapsed,
    isResetting,
    handleMouseDown,
    collapse,
    resetWidth,
  };
};
