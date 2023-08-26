import { NavLink } from "react-router-dom";

type NavTitleProps = {
  children: React.ReactNode;
  position: "sticky" | "relative";
  navOptions: {
    title: string;
    path: string;
  }[];
};

export const NavTitle = ({ children, navOptions, position }: NavTitleProps) => {
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
    </title>
  );
};

export default NavTitle;
