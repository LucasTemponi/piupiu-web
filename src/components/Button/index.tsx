import { ButtonHTMLAttributes } from "react";
import { CircularSpinner } from "../CircularSpinner";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "boring";
  thickness?: "thin" | "medium" | "thick";
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<Required<ButtonProps>["variant"], string> = {
  primary: "bg-primary-200 hover:bg-primary-300 text-secondary-300",
  secondary: "bg-secondary-200 hover:bg-secondary-300 text-white",
  boring: "bg-zinc-300 hover:bg-zinc-200 text-black",
};

const thicknessStyles: Record<Required<ButtonProps>["thickness"], string> = {
  thin: "py-1",
  medium: "py-2",
  thick: "py-3",
};
export const Button = ({
  children,
  thickness = "medium",
  variant = "primary",
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`text-se bg-pri ml-auto w-full cursor-pointer disabled:cursor-auto disabled disabled:bg-zinc-700 px-6 ${thicknessStyles[thickness]} rounded-3xl ${variantStyles[variant]}`}
    >
      {loading ? <CircularSpinner variant={variant} /> : children}
    </button>
  );
};

export default Button;
