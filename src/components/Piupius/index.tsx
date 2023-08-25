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
  const [likesTotal, setLikesTotal] = useState(reactions.like?.total || 0);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(reactions.comment.total || 0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const replyRef = useRef<HTMLDivElement | null>(null);

  const handleLike = useCallback(async () => {
    try {
      if (!liked) {
        setLiked(true);
        setLikesTotal(likesTotal + 1);
        await axios.post(`/posts/${id}/like`);
      } else {
        setLiked(false);
        await axios.delete(`/posts/${id}/like`);
      }
    } catch (err) {
      setLiked(!liked);
      setLikesTotal(likesTotal - 1);
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
      setReplies(replies + 1);
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
        total: replies,
        active: replying,
        onClick: () => setReplying(!replying),
      },
      repiu: { ...reactions.repiu },
      like: {
        total: likesTotal,
        replies,
        active: liked,
        onClick: () => handleLike(),
      },
    };
  }, [reactions, liked, likesTotal, handleLike, replying]);

  useEffect(() => {
    setLiked(reactions?.like?.active);
    setLikesTotal(reactions?.like?.total || 0);
    setReplies(reactions?.comment.total || 0);
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
