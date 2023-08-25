import { NavLink } from "react-router-dom";

type NavTitleProps = {
  children: React.ReactNode;
  navOptions: {
    title: string;
    path: string;
  }[];
};

export const NavTitle = ({ children, navOptions }: NavTitleProps) => {
  return (
    <title className="flex border-[#2f3336] border-b-[1px] border-x-[1px] flex-col">
      {children}
      <nav className="flex select-none w-full justify-center h-12 ">
        {navOptions.map((option) => {
          return (
            <NavLink
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
