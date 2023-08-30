import { useEffect, useRef } from "react";

type DeletableImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  onDelete?: () => void;
};
export const DeletableImage = ({ onDelete, ...props }: DeletableImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDelete = (e: KeyboardEvent) => {
    if (!imageRef.current) return;
    const imageSelected = window.getSelection()?.containsNode(imageRef.current);
    if ((e.key === "Delete" || e.key === "Backspace") && imageSelected) {
      onDelete?.();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleDelete);

    return () => {
      window.removeEventListener("keypress", handleDelete);
    };
  }, []);

  return <img {...props} className="w-full select-all" ref={imageRef} />;
};
