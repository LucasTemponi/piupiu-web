import { NavLink } from "react-router-dom";
import { Piu } from "../../types/Pius";
import { useMemo } from "react";
import { RefrehPostsButton } from "../RefreshPostsButton";

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
  const refreshButtonValues = useMemo(() => {
    return [
      ...new Map(
        refreshButton?.newPosts?.map((item) => [
          item.author?.handle,
          item.author,
        ])
      ).values(),
    ].slice(0, 3);
  }, [refreshButton?.newPosts]);

  return (
    <title
      className={`${position} flex z-10 border-[#2f3336] top-0 backdrop-blur-md bg-semitransparent-dark border-b-[1px] border-x-[1px] flex-col`}
    >
      {children}
      <nav className="flex select-none w-full justify-center h-12 ">
        {navOptions.map((option) => {
          return (
            <NavLink
              end
              key={option.title}
              to={option.path}
              className="flex relative flex-col cursor-pointer w-full justify-center items-center text-zinc-300 hover:bg-zinc-900"
            >
              {({ isActive }) => {
                return (
                  <>
                    <span className="">{option.title}</span>
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
        <RefrehPostsButton newPostsUsers={refreshButtonValues} />
      )}
    </title>
  );
};

export default NavTitle;
