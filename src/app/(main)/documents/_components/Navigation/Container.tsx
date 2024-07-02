'use client';

import React from 'react';
import { cn } from '@/libs/utils';
import { CollapseButton } from './CollapseButton';
import { ControlBar } from './ControlBar';
import { MenuButton } from './MenuButton';
import { useNavigation } from './useNavigation';

type Props = {
  children: React.ReactNode;
};

/**
 * @package
 */
export const Container = ({ ...props }: Props) => {
  const { sidebarRef, navbarRef, isMobile, isCollapsed, isResetting, collapse, resetWidth, handleMouseDown } = useNavigation();

  return (
    <>
      <aside className={cn('group/sidebar pb-4 sticky top-0 left-0 max-h-screen flex h-full w-60 flex-col bg-white min-h-screen border-r-2', isCollapsed && 'opacity-0', isResetting && 'transition-all duration-300 ease-in-out', isMobile && 'w-0')} ref={sidebarRef}>
        <CollapseButton isMobile={isMobile} onClick={collapse} />
        {props.children}
        {!isMobile && <ControlBar onClick={resetWidth} onMouseDown={handleMouseDown} />}
      </aside>
      <div className={cn(isResetting && 'transition-all duration-300 ease')} ref={navbarRef}>
        <nav className={cn(!isCollapsed && 'hidden', 'w-12 px-3 py-2')}>{isCollapsed && <MenuButton onClick={resetWidth} />}</nav>
      </div>
    </>
  );
};
