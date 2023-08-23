import { useState } from "react";
import ProfilePic from "../components/ProfilePic";
import { User } from "../types/Users";
import { MainLayout } from "../components/MainLayout";
import { Username } from "../components/Username";
import { Piu } from "../types/Pius";
import Piupiu from "../components/Piupius";
import NavTitle from "../components/NavTitle";
import { NavHeader } from "../components/NavHeader";
// import { NavLink } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<Piu[]>();

  return (
    <MainLayout>
      <NavHeader
        title={user?.name || ""}
        subtitle={`${user?.posts?.length || 0} piadas`}
      />
      <NavTitle
        navOptions={[
          { title: "Perfil", path: "/profile" },
          { title: "Curtidas", path: "/likes" },
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

      <main>
        {userPosts?.map((piupiu: Piu) => {
          return user ? (
            <Piupiu
              key={piupiu.id}
              author={user}
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
          ) : null;
        })}
      </main>
    </MainLayout>
  );
};
