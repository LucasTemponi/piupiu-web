export const AuthFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex py-6 flex-wrap md:flex-row flex-col select-none w-full h-[100vh] md:justify-between">
      <div className="w-full items-center md:w-1/2 md:h-full h-16 flex justify-start md:justify-center">
        <img className="ml-8 md:w-96 h-full md:h-96 w-16" src="/logo.png" />
      </div>
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center ">
        {children}
      </div>
    </div>
  );
};
