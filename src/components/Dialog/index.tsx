import { useEffect } from "react";
import { useCloseElement } from "../../hooks/useCloseElement";

type DialogProps = {
  open: boolean;
  onClose: (state: boolean) => void;
  children?: React.ReactNode;
};
export const Dialog = ({ open, onClose, children }: DialogProps) => {
  const dialogRef = useCloseElement({
    initialState: open || false,
    onChange: onClose,
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    open && (
      <dialog
        open={open}
        className="flex fixed h-full w-full items-center justify-center bg-transparent backdrop-blur-sm inset-0 rounded-2xl z-50"
      >
        <div ref={dialogRef} className="bg-zinc-900 rounded-2xl">
          {children}
        </div>
      </dialog>
    )
  );
};
