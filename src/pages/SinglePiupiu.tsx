import { useCallback, useEffect, useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { NavHeader } from "../components/NavHeader";
import { Piu } from "../types/Pius";
import Piupiu from "../components/Piupius";
import NewPiupiu from "../components/NewPiupiu";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [post, setPost] = useState<Piu>();
  const [userReply, setuserReply] = useState("");
  const [replying, setReplying] = useState(false);
  const { id: postId } = useParams();
  const { user } = useAuth();

  const getReplies = useCallback(async () => {
    try {
      const res = await axios.get(`/posts/${postId}/replies`);
      setReplies(res.data.replies);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      axios
        .get(`/posts/${postId}`)
        .then((res) => {
          setPost(res.data);
          getReplies();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReplying(true);
    try {
      await axios.post(`/posts/${postId}/reply`, {
        message: userReply,
      });
      setuserReply("");
      getReplies();
    } catch (err) {
      console.log(err);
    }

    setReplying(false);
  };

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
              active: post?.liked,
              onClick: () => {},
            },
          },
        }}
      />
      {user && (
        <NewPiupiu
          onChange={(e) => setuserReply(e.target.value)}
          onSubmit={handleSubmit}
          placeholder="Prove que essa pessoa está errada!"
          user={user}
          variant="reply"
          value={userReply}
          loading={replying}
        />
      )}
      {replies?.map((piupiu: Piu) => {
        return (
          <Piupiu
            key={piupiu.id}
            id={piupiu.id}
            author={piupiu.author}
            onChange={getReplies}
            reactions={{
              comment: {
                active: false,
                total: piupiu.replies?.total,
              },
              repiu: {
                active: false,
                total: 0,
              },
              like: {
                total: piupiu.likes?.total,
                active: piupiu.liked,
              },
            }}
            body={piupiu.message}
          />
        );
      })}
    </>
  );
};
