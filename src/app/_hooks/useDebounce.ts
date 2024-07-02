import { useCallback, useRef } from 'react';

type Debounce = (fn: () => void) => void;

type DebounceReturn = {
  debounce: Debounce;
  flush: () => void;
};

export const useDebounce = (timeout: number): DebounceReturn => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceFn = useRef<() => void>(() => {});

  const debounce: Debounce = useCallback(
    (fn) => {
      debounceFn.current = fn;
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        debounceFn.current();
        debounceFn.current = () => {};
      }, timeout);
    },
    [timeout]
  );

  const flush = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    debounceFn.current();
  }, [timer, debounceFn]);

  return { debounce, flush };
};
