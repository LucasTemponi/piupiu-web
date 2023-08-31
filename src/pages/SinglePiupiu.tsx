import { useCallback, useEffect, useRef, useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { NavHeader } from "../components/NavHeader";
import { Piu } from "../types/Pius";
import NewPiupiu from "../components/NewPiupiu";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { PiupiuList } from "../components/PiupiuList";
import { backendRoutes } from "../routes";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState<Piu>();
  const [userReply, setuserReply] = useState("");
  const [replying, setReplying] = useState(false);
  const { id: postId } = useParams();
  const { user } = useAuth();
  const debounceTimer = useRef<number>();

  const getReplies = useCallback(async () => {
    try {
      const res = await axios.get(backendRoutes.singlePiupiu.replies(postId));
      setReplies(res.data.replies);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      axios
        .get(backendRoutes.singlePiupiu.post(postId))
        .then((res) => {
          setPost(res.data);
          getReplies();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent, replyText?: string) => {
    e.preventDefault();
    setReplying(true);
    try {
      await axios.post(backendRoutes.singlePiupiu.reply(postId), {
        message: replyText,
      });
      setuserReply("");
      getReplies();
    } catch (err) {
      console.log(err);
    }

    setReplying(false);
  };

  const handleLike = useCallback(async () => {
    setLiked(!liked);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      if (liked !== post?.liked) return;
      try {
        if (!liked) {
          await axios.post(backendRoutes.singlePiupiu.like(postId));
        } else {
          await axios.delete(backendRoutes.singlePiupiu.like(postId));
        }
      } catch (err) {
        setLiked(!liked);
        console.log(err);
      }
    }, 250);
  }, [postId, liked, post, debounceTimer.current]);

  return (
    <>
      <NavHeader title="Post" />
      <CompletePiupiu
        author={post?.author}
        body={post?.message || ""}
        reactions={{
          reactions: {
            comment: {
              active: false,
              total: post?.replies?.total,
            },
            repiu: {
              active: false,
              total: 0,
            },
            like: {
              total: post?.likes?.total,
              active: liked,
              onClick: handleLike,
            },
          },
        }}
      />
      {user && (
        <NewPiupiu
          onChange={(e) => setuserReply(e.target.value)}
          onSubmit={handleSubmit}
          user={user}
          variant="reply"
          value={userReply}
          loading={replying}
        />
      )}
      <PiupiuList piupius={replies} onChange={getReplies} />
    </>
  );
};
