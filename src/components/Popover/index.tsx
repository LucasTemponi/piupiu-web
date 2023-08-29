import React from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { useCloseElement } from "../../hooks/useCloseElement";
type PopoverProps = {
  children: React.ReactNode;
  open: boolean;
  onChange: (state: boolean) => void;
};
export const Popover = ({ children, open, onChange }: PopoverProps) => {
  const popoverRef = useCloseElement({
    initialState: open,
    onChange,
  });

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
