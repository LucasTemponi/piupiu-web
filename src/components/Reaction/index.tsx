export type ReactionProps = {
  icon: React.ReactNode;
  count: number;
  variant: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  active?: boolean;
  type?: "simplified" | "complete";
};

const variantColors = (
  active?: boolean
): Record<ReactionProps["variant"], { text: string; glow: string }> => ({
  primary: {
    text: `${
      active
        ? "text-primary-300 dark:text-primary-100"
        : "text-text-light dark:text-white"
    } hover:text-primary-300 hover:dark:text-primary-100`,
    glow: "group-hover:bg-primary-300 group-hover:dark:bg-primary-100 ",
  },
  secondary: {
    text: `${
      active
        ? "text-tertiary-300 dark:text-tertiary-100"
        : "text-text-light dark:text-white"
    } hover:text-tertiary-300`,
    glow: "group-hover:bg-tertiary-300 group-hover:dark:bg-tertiary-100",
  },
  tertiary: {
    text: `${
      active
        ? "text-quaternary-300 dark:text-quaternary-100"
        : "text-text-light dark:text-white"
    } hover:text-quaternary-300`,
    glow: "group-hover:bg-quaternary-300 group-hover:dark:bg-quaternary-300",
  },
});

export const Reaction = ({
  count,
  icon,
  variant,
  onClick,
  active,
  type = "complete",
}: ReactionProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`flex group select-none h-5 items-center gap-2 ${
        variantColors(active)[variant].text
      } cursor-pointer`}
    >
      <div className="w-5 h-5 transition-colors flex items-center justify-center">
        <div
          className={`absolute opacity-10 w-8 h-8 rounded-full ${
            variantColors(active)[variant].glow
          }`}
        ></div>
        {icon}
      </div>
      {type === "complete" && <span className="text-sm">{count}</span>}
    </div>
  );
};

export default Reaction;
