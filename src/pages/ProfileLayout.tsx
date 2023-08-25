import { useEffect, useState } from "react";
import { NavHeader } from "../components/NavHeader";
import NavTitle from "../components/NavTitle";
import ProfilePic from "../components/ProfilePic";
import { Username } from "../components/Username";
import { User } from "../types/Users";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ProfileLayout = () => {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<number>();

  const { handle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get(`users/${handle}`)
        .then((res) => {
          setUser(res.data.user);
          setUserPosts(res.data.posts);
        })
        .catch(() => {
          navigate("/home");
        });
    };

    fetchUser();
  }, [handle]);

  return (
    <>
      <NavHeader
        title={user?.name || ""}
        subtitle={`${userPosts || 0} piadas`}
      />
      <NavTitle
        navOptions={[
          { title: "Perfil", path: `/${user?.handle}` },
          { title: "Curtidas", path: `/${user?.handle}/likes` },
        ]}
      >
        <section className="h-48 w-full bg-zinc-700" />
        <section className="relative px-3 w-full">
          <div className="min-h-[5rem] w-full">
            <div className="absolute -top-16 left-4 ">
              <ProfilePic
                border
                variant="reallyBig"
                userName={user?.name || ""}
                image={user?.image_url}
              />
            </div>
          </div>
          <div>
            <Username size="xl" variant="column" user={user} />
          </div>
        </section>
      </NavTitle>
      <Outlet />
    </>
  );
};
