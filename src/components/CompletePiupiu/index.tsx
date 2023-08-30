import { useEffect, useState } from "react";
import { checkForImageLinks } from "../../helpers";
import { User } from "../../types/Users";
import ProfilePic from "../ProfilePic";
import ReactionsBar, { ReactionsBarProps } from "../ReactionsBar";
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
  const [foundLinks, setFoundLinks] = useState("");

  useEffect(() => {
    return () => {
      setFoundLinks("");
    };
  }, [author]);

  return (
    <article className="flex flex-col select-none border-y-0 w-full h-min px-4 py-2 border-[#2f3336] border-[1px] ">
      <header className="w-full flex gap-2 mb-3 ">
        <ProfilePic image={author?.image_url} userName={author?.name || ""} />
        <Username variant="column" user={author} />
      </header>
      <main className="mt-1 break-words pr-8 text-left mb-1">
        {checkForImageLinks(body, (link) => {
          !foundLinks && setFoundLinks(link);
        })}
        <img className="w-full my-2" src={foundLinks} />
      </main>
      <span>{timestamp}</span>
      <div className="flex border-b-[1px] py-3 border-[#2f3336]">
        <ReactionsTextBar
          reactions={[
            {
              title: "Comentários",
              total: reactions.reactions.comment?.total || 0,
            },
            { title: "Repius", total: reactions.reactions.repiu?.total || 0 },
            { title: "Likes", total: reactions.reactions.like?.total || 0 },
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
