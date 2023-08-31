import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
type NavHeaderProps = {
  title: string;
  subtitle?: string;
};

export const NavHeader = ({ title, subtitle }: NavHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex z-20 bg-semitransparent-light dark:bg-semitransparent-dark backdrop-blur-md top-0 select-none px-2 pb-1 border-border-light dark:border-border-dark border-x-[1px] sticky items-center gap-5">
      <div
        onClick={() => navigate(-1)}
        className="h-9 w-9 text-text-light hover:bg-zinc-300 dark:text-white dark:hover:bg-zinc-900 rounded-full flex justify-center items-center"
      >
        <BiArrowBack className="text-xl cursor-pointer" />
      </div>
      <div className="leading-none select-none">
        <h1
          className={`text-xl ${
            !subtitle ? "my-2" : ""
          } text-text-light dark:text-white font-bold`}
        >
          {title}
        </h1>
        {subtitle && <span className="text-sm text-zinc-400">{subtitle}</span>}
      </div>
    </header>
  );
};
