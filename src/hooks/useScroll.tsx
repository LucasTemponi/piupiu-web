import { MutableRefObject, useCallback, useEffect } from "react";

type ScrollType = {
  topRef: MutableRefObject<Element | null>;
  bottomRef: MutableRefObject<Element | null>;
  refreshVariable?: unknown;
  onTopEnter?: () => void;
  onTopLeave?: () => void;
  onBottomEnter?: () => void;
  onBottomLeave?: () => void;
};
export const usePagination = ({
  topRef,
  bottomRef,
  refreshVariable,
  onTopEnter,
  onTopLeave,
  onBottomEnter,
  onBottomLeave,
}: ScrollType) => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleTopEnter = useCallback(() => onTopEnter?.(), [onTopEnter]);
  const handleTopLeave = useCallback(() => onTopLeave?.(), [onTopLeave]);
  const handleBottomEnter = useCallback(
    () => onBottomEnter?.(),
    [onBottomEnter]
  );
  const handleBottomLeave = useCallback(
    () => onBottomLeave?.(),
    [onBottomLeave]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const bottomObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleBottomEnter?.();
      }
      if (!entry.isIntersecting) {
        handleBottomLeave?.();
      }
    }, options);

    const topObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleTopEnter?.();
      }
      if (!entry.isIntersecting) {
        handleTopLeave?.();
      }
    }, options);

    if (bottomRef.current) {
      bottomObserver.observe(bottomRef.current);
    }

    if (topRef.current) {
      topObserver.observe(topRef.current);
    }

    return () => {
      bottomObserver.disconnect();
      topObserver.disconnect();
    };
  }, [refreshVariable]);

  return { scrollTop };
};
