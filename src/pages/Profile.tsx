import { useEffect, useState } from "react";
import axios from "axios";
import { Piu } from "../types/Pius";
import Piupiu from "../components/Piupius";
import { useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";

type ProfileProps = {
  postsRoute: "posts" | "likes";
};
export const Profile = ({ postsRoute }: ProfileProps) => {
  const [userPosts, setUserPosts] = useState<Piu[]>();
  const { handle } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      axios.get(`users/${handle}/${postsRoute}`).then((res) => {
        setUserPosts(res.data);
      });
    };

    fetchUser();
  }, [handle, postsRoute]);

  return (
    <>
      <main>
        {userPosts?.map((piupiu: Piu) => {
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
      </main>
    </>
  );
};
