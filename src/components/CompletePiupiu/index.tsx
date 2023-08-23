import { User } from "../../types/Users";
import ProfilePic from "../ProfilePic";
import ReactionsBar, { ReactionsBarProps } from "../ReactionsBar/indes";
import { ReactionsTextBar } from "../ReactionsTextBar";
import { Username } from "../Username";

type BigPiupiuProps = {
  author?: User;
  body: string;
  reactions: ReactionsBarProps;
  timestamp?: string;
  children?: React.ReactNode;
};
export const CompletePiupiu = ({
  author,
  body,
  reactions,
  timestamp,
  children,
}: BigPiupiuProps) => {
  return (
    <article className="flex flex-col select-none border-y-0 w-full h-min px-4 py-2 border-[#2f3336] border-[1px] ">
      <header className="w-full flex gap-2 mb-3 ">
        <ProfilePic image={author?.image_url} userName={author?.name || ""} />
        <Username variant="column" user={author} />
      </header>
      <main className="border-b-[1px] border-[#2f3336] text-left pb-4 ">
        {body}
      </main>
      <span>{timestamp}</span>
      <div className="flex border-b-[1px] py-3 border-[#2f3336]">
        <ReactionsTextBar
          reactions={[
            { title: "Comentários", total: 5 },
            { title: "Repius", total: 10 },
            { title: "Likes", total: 20 },
          ]}
        />
      </div>
      <div className="flex justify-center border-b-[1px] py-3 border-[#2f3336]">
        <ReactionsBar type="simplified" {...reactions} />
      </div>
      {children}
    </article>
  );
};
