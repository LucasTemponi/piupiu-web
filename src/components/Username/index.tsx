import { useNavigate } from "react-router-dom";
import { User } from "../../types/Users";
import { LuVerified } from "react-icons/lu";

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
    clickable && navigate(`/${user?.handle}`);
  };

  return (
    <header
      onClick={clickable ? onClick : undefined}
      className={`text-left ${variant === "row" ? "flex-row" : "flex-col"} ${
        variant === "row" ? "gap-1" : ""
      } flex min-h-10 cursor-pointer`}
    >
      <h1
        className={`${
          size === "xl" ? "text-xl " : "text-sm"
        } font-bold flex justify-start ${clickable ? "hover:underline" : ""} `}
      >
        <span onClick={handleUserClick}>{user?.name}</span>
        {user?.verified && showVerified && (
          <LuVerified
            className={`ml-1 my-auto ${
              size === "xl" ? "text-2xl" : "text-xl"
            } text-black fill-primary-100`}
          />
        )}
      </h1>
      <h6 className={`${size === "xl" ? "text-sm " : "text-xs"} text-zinc-400`}>
        @{user?.handle}
      </h6>
    </header>
  );
};
