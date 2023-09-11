import { useNavigate } from "react-router-dom";
import { User } from "../../types/Users";
import { LuVerified } from "react-icons/lu";
import { routes } from "../../routes";

type UsernameProps = {
  user?: User;
  variant?: "row" | "column";
  size?: "sm" | "xl";
  onClick?: () => void;
  clickable?: boolean;
  showVerified?: boolean;
};
export const Username = ({
  user,
  variant = "row",
  size = "sm",
  clickable = true,
  showVerified = true,
  onClick,
}: UsernameProps) => {
  const navigate = useNavigate();

  const handleUserClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(routes.profile(user?.handle));
  };

  return (
    <header
      onClick={clickable ? onClick : undefined}
      className={`text-left ${variant === "row" ? "flex-row" : "flex-col"} ${
        variant === "row" ? "gap-1" : ""
      } flex max-w-full min-h-10 cursor-pointer overflow-hidden text-ellipsis`}
    >
      <h1
        className={`${
          size === "xl" ? "text-xl " : "text-sm"
        } font-bold text-text-light dark:text-white flex justify-start ${
          clickable ? "hover:underline" : ""
        } `}
      >
        <span
          className="whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={clickable ? handleUserClick : undefined}
        >
          {user?.name}
        </span>
        {user?.verified && showVerified && (
          <LuVerified
            className={`ml-1 my-auto ${
              size === "xl" ? "text-2xl" : "text-2xl dark:text-xl"
            } text-white fill-secondary-100  dark:text-black dark:fill-primary-100 `}
          />
        )}
      </h1>
      <h6
        className={`${
          size === "xl" ? "text-sm " : "text-xs"
        } text-zinc-500 overflow-hidden text-ellipsis items-centerflex dark:text-zinc-400`}
      >
        @{user?.handle}
      </h6>
    </header>
  );
};
