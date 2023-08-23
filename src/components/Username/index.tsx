import { User } from "../../types/Users";
import { LuVerified } from "react-icons/lu";

type UsernameProps = {
  user?: User;
  variant?: "row" | "column";
  size?: "sm" | "xl";
  onClick?: (user?: User) => void;
};
export const Username = ({
  user,
  variant = "row",
  size = "sm",
  onClick,
}: UsernameProps) => {
  return (
    <header
      onClick={() => onClick?.(user)}
      className={`text-left ${variant === "row" ? "flex-row" : "flex-col"} ${
        variant === "row" ? "gap-1" : ""
      } flex min-h-10 cursor-pointer`}
    >
      <h1
        className={`${
          size === "xl" ? "text-xl " : "text-sm"
        } font-bold flex justify-start`}
      >
        {user?.name}
        {user?.verified && (
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
