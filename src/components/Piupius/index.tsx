import { User } from "../../types/Users";
import { ProfilePic } from "../ProfilePic";
import { ReactionsBar, ReactionsBarProps } from "../ReactionsBar";
import { Username } from "../Username";

type PiupiuProps = {
  author: User;
  body: string;
  reactions: ReactionsBarProps;
  onClick?: () => void;
};
export const Piupiu = ({ author, body, reactions, onClick }: PiupiuProps) => {
  return (
    <article
      onClick={onClick}
      className="flex cursor-pointer hover:bg-[rgba(255,255,255,0.03)] select-none border-t-0 w-full h-min px-4 py-2 border-[#2f3336] border-[1px] "
    >
      <ProfilePic image={author.image_url} userName={author.name} />
      <div className="px-2 w-full">
        <Username user={author} />
        <main className="mt-1 text-left mb-1">{body}</main>
        <ReactionsBar {...reactions} />
      </div>
    </article>
  );
};

export default Piupiu;
