import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { User } from "../../types/Users";
import { ProfilePic } from "../ProfilePic";
import { ReactionsBar, reactions } from "../ReactionsBar";
import { Username } from "../Username";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewPiupiu from "../NewPiupiu";
import { useAuth } from "../../contexts/Auth";

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
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const replyRef = useRef<HTMLDivElement | null>(null);

  const handleLike = useCallback(async () => {
    try {
      if (!liked) {
        await axios.post(`/posts/${id}/like`);
        setLiked(true);
      } else {
        await axios.delete(`/posts/${id}/like`);
        setLiked(false);
      }
    } catch (err) {
      console.log(err);
    }
    onChange?.();
  }, [id, liked, onChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReplying(true);
    try {
      await axios.post(`/posts/${id}/reply`, {
        message: replyText,
      });
      setReplyText("");
    } catch (err) {
      console.log(err);
    }
    onChange?.();
    setReplying(false);
  };

  const handleClick = () => {
    onClick ? onClick() : navigate(`/piu/${id}`);
  };
  const reactionProps = useMemo(() => {
    return {
      comment: {
        ...reactions.comment,
        active: replying,
        onClick: () => setReplying(!replying),
      },
      repiu: { ...reactions.repiu },
      like: { ...reactions.like, active: liked, onClick: () => handleLike() },
    };
  }, [reactions, liked, handleLike, replying]);

  useEffect(() => {
    setLiked(reactions?.like?.active);
  }, [reactions]);

  useEffect(() => {
    const closeOnClickOut = (e: MouseEvent) => {
      if (
        replying &&
        replyRef.current &&
        !e.composedPath().includes(replyRef.current)
      ) {
        setReplying(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && replying) {
        setReplying(false);
      }
    };

    window.addEventListener("mousedown", closeOnClickOut);
    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("mousedown", closeOnClickOut);
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [replying]);

  return (
    <div ref={replyRef}>
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
      {user && replying && (
        <NewPiupiu
          value={replyText}
          onSubmit={handleSubmit}
          onChange={(e) => setReplyText(e.target.value)}
          variant="reply"
          user={user}
        />
      )}
    </div>
  );
};

export default Piupiu;
