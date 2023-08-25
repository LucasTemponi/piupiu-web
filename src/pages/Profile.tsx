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

  const fetchPosts = async () => {
    axios.get(`users/${handle}/${postsRoute}`).then((res) => {
      setUserPosts(res.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [handle, postsRoute]);

  return (
    <>
      <main>
        {userPosts?.map((piupiu: Piu) => {
          return (
            <Piupiu
              key={piupiu.id}
              id={piupiu.id}
              author={piupiu.author}
              onChange={fetchPosts}
              reactions={{
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
