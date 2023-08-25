import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "../../types/Users";
import { ProfilePic } from "../ProfilePic";
import { ReactionsBar, reactions } from "../ReactionsBar";
import { Username } from "../Username";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type PiupiuProps = {
  id: string;
  author: User;
  body: string;
  onChange?: () => void;
  reactions: Record<
    (typeof reactions)[number],
    { active?: boolean; total?: number }
  >;
  onClick?: () => void;
};
export const Piupiu = ({
  id,
  author,
  body,
  reactions,
  onChange,
  onClick,
}: PiupiuProps) => {
  const [liked, setLiked] = useState(reactions.like?.active);
  const navigate = useNavigate();

  const handleLike = useCallback(async () => {
    try {
      if (!liked) {
        await axios.post(`/posts/${id}/like`);
        setLiked(true);
      } else {
        console.log("no delete");
        await axios.delete(`/posts/${id}/like`);
        setLiked(false);
      }
    } catch (err) {
      console.log(err);
    }
    onChange?.();
  }, [id, liked, onChange]);

  const handleClick = () => {
    onClick ? onClick() : navigate(`/piu/${id}`);
  };
  const reactionProps = useMemo(() => {
    return {
      comment: { ...reactions.comment },
      repiu: { ...reactions.repiu },
      like: { ...reactions.like, active: liked, onClick: () => handleLike() },
    };
  }, [reactions, liked, handleLike]);

  useEffect(() => {
    setLiked(reactions?.like?.active);
  }, [reactions]);

  return (
    <article
      onClick={handleClick}
      className="flex cursor-pointer hover:bg-[rgba(255,255,255,0.03)] select-none border-t-0 w-full h-min px-4 py-2 border-[#2f3336] border-[1px] "
    >
      <ProfilePic image={author.image_url} userName={author.name} />
      <div className="px-2 w-full">
        <Username user={author} />
        <main className="mt-1 text-left mb-1">{body}</main>
        <ReactionsBar reactions={reactionProps} />
      </div>
    </article>
  );
};

export default Piupiu;
