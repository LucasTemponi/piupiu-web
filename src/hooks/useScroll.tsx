import { MutableRefObject, useEffect } from "react";

type ScrollType = {
  topRef: MutableRefObject<Element | null>;
  bottomRef: MutableRefObject<Element | null>;
  onTopEnter?: () => void;
  onTopLeave?: () => void;
  onBottomEnter?: () => void;
  onBottomLeave?: () => void;
};
export const usePagination = ({
  topRef,
  bottomRef,
  onTopEnter,
  onTopLeave,
  onBottomEnter,
  onBottomLeave,
}: ScrollType) => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const bottomObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onBottomEnter?.();
      }
      if (!entry.isIntersecting) {
        onBottomLeave?.();
      }
    }, options);

    const topObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onTopEnter?.();
      }
      if (!entry.isIntersecting) {
        onTopLeave?.();
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
  }, [
    topRef.current,
    bottomRef.current,
    onTopEnter,
    onTopLeave,
    onBottomEnter,
    onBottomLeave,
  ]);

  return { scrollTop };
};
