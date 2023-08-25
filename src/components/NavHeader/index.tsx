import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
type NavHeaderProps = {
  title: string;
  subtitle?: string;
};

export const NavHeader = ({ title, subtitle }: NavHeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex z-10 bg-semitransparent-dark backdrop-blur-md top-0 select-none px-2 pb-1 border-[#2f3336] border-x-[1px] sticky items-center gap-5">
      <div
        onClick={() => navigate(-1)}
        className="h-9 w-9 hover:bg-zinc-900 rounded-full flex justify-center items-center"
      >
        <BiArrowBack className="text-xl cursor-pointer" />
      </div>
      <div className="leading-none">
        <h1 className={`text-xl ${!subtitle ? "my-2" : ""} font-bold`}>
          {title}
        </h1>
        {subtitle && <span className="text-sm text-zinc-400">{subtitle}</span>}
      </div>
    </header>
  );
};
