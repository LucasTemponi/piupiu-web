import { useState } from "react";
import { CompletePiupiu } from "../components/CompletePiupiu";
import { MainLayout } from "../components/MainLayout";
import { NavHeader } from "../components/NavHeader";
import { mockAuthor } from "./Main";
import { Piu } from "../types/Pius";
import Piupiu from "../components/Piupius";
import NewPiupiu from "../components/NewPiupiu";

export const SinglePiupiu = () => {
  const [replies, setReplies] = useState<Piu[]>();
  const [post, setPost] = useState<Piu>();

  return (
    <MainLayout>
      <NavHeader title="Post" />
      <CompletePiupiu
        author={mockAuthor}
        body={post?.message || ""}
        reactions={{
          reactions: {
            comment: {
              active: false,
              total: 0,
            },
            repiu: {
              active: false,
              total: 0,
            },
            like: {
              total: 0,
              active: true,
              onClick: () => {},
            },
          },
        }}
      />
      <NewPiupiu
        placeholder="Prove que essa pessoa está errada!"
        user={mockAuthor}
        variant="reply"
      />
      {replies?.map((piupiu: Piu) => {
        return (
          <Piupiu
            key={piupiu.id}
            author={piupiu.author}
            reactions={{
              reactions: {
                comment: {
                  active: false,
                  total: 0,
                },
                repiu: {
                  active: false,
                  total: 0,
                },
                like: {
                  total: piupiu.likes?.total,
                  active: piupiu.liked,
                  onClick: () => {},
                },
              },
            }}
            body={piupiu.message}
          />
        );
      })}
    </MainLayout>
  );
};
