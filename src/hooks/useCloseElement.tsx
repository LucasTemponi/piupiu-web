import { useEffect, useRef } from "react";

type UseCloseElementProps = {
  initialState: boolean;
  onChange: (state: boolean) => void;
  options?: {
    closeClickAnywhere?: boolean;
  };
};
export const useCloseElement = ({
  initialState,
  onChange,
  options,
}: UseCloseElementProps) => {
  const elementRef = useRef<any | null>(null);

  useEffect(() => {
    const closeOnClickOut = (e: MouseEvent) => {
      if (
        initialState &&
        elementRef.current &&
        (!e.composedPath().includes(elementRef.current) ||
          options?.closeClickAnywhere)
      ) {
        onChange(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && initialState) {
        onChange(false);
      }
    };

    window.addEventListener("mousedown", closeOnClickOut);
    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("mousedown", closeOnClickOut);
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [open, initialState, onChange]);

  return elementRef;
};
