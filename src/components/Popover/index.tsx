import React, { useEffect, useRef } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
type PopoverProps = {
  children: React.ReactNode;
  // ref: React.RefObject<HTMLDivElement>;
  open: boolean;
  onChange: (state: boolean) => void;
};
export const Popover = ({ children, open, onChange }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeOnClickOut = (e: MouseEvent) => {
      if (
        open &&
        popoverRef.current &&
        !e.composedPath().includes(popoverRef.current)
      ) {
        onChange(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onChange(false);
      }
    };

    window.addEventListener("mousedown", closeOnClickOut);
    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("mousedown", closeOnClickOut);
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [open]);

  return open ? (
    <div
      ref={popoverRef}
      className="absolute bottom-16 min-w-full flex items-center flex-col"
    >
      <div className="shadow-cs rounded-xl py-3 w-full flex flex-col">
        {children}
      </div>
      <BiSolidDownArrow className="text-xs -mt-[3px] text-black" />
    </div>
  ) : null;
};
