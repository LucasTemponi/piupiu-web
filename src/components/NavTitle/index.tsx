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
        {/* <NavLink to="/" />
      <NavLink to="/likes" /> */}
        {navOptions.map((option) => {
          return (
            <a
              href={option.path}
              className="flex relative flex-col cursor-pointer w-full justify-center items-center text-zinc-300 hover:bg-zinc-900"
            >
              <span className="">{option.title}</span>
              <div className="h-1 bottom-0 absolute rounded-full w-14 flex items-center bg-secondary-200" />
            </a>
          );
        })}
      </nav>
    </title>
  );
};

export default NavTitle;
