import React, { Dispatch, FocusEvent, SetStateAction, createContext, useContext, useRef, useState, ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/libs/utils';
import { useElementPosition } from './useElementPosition';

const DropdownContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isInUpperHalf: boolean;
}>({
  isOpen: false,
  setIsOpen: () => {},
  isInUpperHalf: false,
});

const Dropdown = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isInUpperHalf } = useElementPosition<HTMLDivElement>(dropdownRef);
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (relatedTarget && dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, isInUpperHalf }}>
      <div className={cn('relative', className)} onBlur={handleBlur} ref={dropdownRef} tabIndex={0} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const Trigger = ({ children, className, ...props }: ComponentPropsWithoutRef<'button'>) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  return (
    <button className={cn('', className)} {...props} onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  );
};

const Content = ({ children, className, side = 'bottom', sideOffset = 4, align = 'left', ...props }: ComponentPropsWithoutRef<'div'> & { side?: 'top' | 'right' | 'bottom' | 'left'; sideOffset?: number; align?: 'left' | 'right' }) => {
  const { isOpen } = useContext(DropdownContext);
  const sidePosition = `${side}-[${sideOffset}px]` as const;
  const alignPosition = `${align}-0` as const;

  return (
    <>
      {isOpen ? (
        <div
          className={cn('absolute bg-white min-w-[128px] z-50 break-keep w-fit data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out rounded-md border p-2', alignPosition, sidePosition, className)}
          data-state={isOpen ? 'open' : 'close'}
          {...props}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

const ContentGroup = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

const ContentItem = ({ className, asChild, ...props }: { asChild?: boolean } & ComponentPropsWithoutRef<'div'>) => {
  const Component = asChild ? Slot : 'div';
  return <Component className={cn('relative w-full flex cursor-default select-none items-center rounded-sm p-1 py-1.5 text-sm transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent', className)} {...props} />;
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.ContentGroup = ContentGroup;
Dropdown.ContentItem = ContentItem;

export default Dropdown;
