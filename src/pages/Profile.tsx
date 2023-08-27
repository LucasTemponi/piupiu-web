import { useEffect, useState } from "react";
import axios from "axios";
import { Piu } from "../types/Pius";
import { useParams } from "react-router-dom";
import { PiupiuList } from "../components/PiupiuList";
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
        <PiupiuList piupius={userPosts} />
      </main>
    </>
  );
};
