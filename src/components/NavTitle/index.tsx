import { NavLink } from "react-router-dom";
import { Piu } from "../../types/Pius";
import { useMemo } from "react";
import { RefrehPostsButton } from "../RefreshPostsButton";
import { useAuth } from "../../contexts/Auth";

type NavTitleProps = {
  children: React.ReactNode;
  position: "sticky" | "relative";
  navOptions: {
    title: string;
    path: string;
  }[];
  refreshButton?: {
    onClick?: () => void;
    newPosts?: Piu[];
  };
};

export const NavTitle = ({
  children,
  navOptions,
  position,
  refreshButton,
}: NavTitleProps) => {
  const { user } = useAuth();
  const refreshButtonValues = useMemo(() => {
    return [
      ...new Map(
        refreshButton?.newPosts
          ?.filter((item) => item.author.handle !== user?.handle)
          .map((item) => [item.author?.handle, item.author])
      ).values(),
    ].slice(0, 3);
  }, [refreshButton?.newPosts]);

  return (
    <title
      className={`${position} flex text-text-light dark:text-white z-10 border-border-light dark:border-border-dark top-0 backdrop-blur-md bg-semitransparent-light dark:bg-semitransparent-dark border-b-[1px] border-x-[1px] flex-col`}
    >
      {children}
      <nav className="flex select-none w-full justify-center h-12 ">
        {navOptions.map((option) => {
          return (
            <NavLink
              end
              key={option.title}
              to={option.path}
              className="flex relative flex-col cursor-pointer w-full justify-center items-center text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
              {({ isActive }) => {
                return (
                  <>
                    <span className="text-text-light dark:text-white">
                      {option.title}
                    </span>
                    {isActive && (
                      <div className="h-1 bottom-0 absolute rounded-full w-14 flex items-center bg-secondary-200" />
                    )}
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </nav>
      {refreshButton?.newPosts && refreshButtonValues.length > 0 && (
        <RefrehPostsButton
          onClick={refreshButton.onClick}
          newPostsUsers={refreshButtonValues}
        />
      )}
    </title>
  );
};

export default NavTitle;
