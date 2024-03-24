import { useEffect, useRef } from 'react';

type Callback = (entries: IntersectionObserverEntry[]) => void;
interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = (
  callback: Callback,
  options?: ObserverOptions
) => {
  const targerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (targerRef.current) {
      observer.observe(targerRef.current);
    }

    return () => {
      if (targerRef.current) {
        observer.unobserve(targerRef.current);
      }
    };
  });

  return targerRef;
};
