import { useEffect, useRef, useState } from "react";
import { NavHeader } from "../components/NavHeader";
import NavTitle from "../components/NavTitle";
import ProfilePic from "../components/ProfilePic";
import { Username } from "../components/Username";
import { User } from "../types/Users";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/Auth";
import { BsFillPencilFill } from "react-icons/bs";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { Dialog } from "../components/Dialog";

export const ProfileLayout = () => {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<number>();
  const { user: loggedUser } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDialogClick = () => {
    // dialogRef.current?.showModal();
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <NavHeader
        title={user?.name || ""}
        subtitle={`${userPosts || 0} piadas`}
      />
      <NavTitle
        position="relative"
        navOptions={[
          { title: "Perfil", path: `/${user?.handle}` },
          { title: "Curtidas", path: `/${user?.handle}/likes` },
        ]}
      >
        <section className="h-48 w-full bg-zinc-700" />
        <section className="relative mb-2 select-none px-3 w-full">
          <div className="min-h-[5rem] flex justify-end w-full">
            <div className="absolute -top-16 left-4 ">
              <ProfilePic
                border
                variant="reallyBig"
                userName={user?.name || ""}
                image={user?.image_url}
              />
            </div>
            {user?.handle === loggedUser?.handle && (
              <div
                onClick={handleDialogClick}
                className="absolute cursor-pointer rounded-full bg-zinc-950 hover:bg-zinc-900 p-6 right-4 top-4"
              >
                <BsFillPencilFill />
              </div>
            )}
          </div>
          <div>
            <Username size="xl" variant="column" user={user} />
          </div>
        </section>
      </NavTitle>
      <Outlet />
      <Dialog
        onClose={() => {
          console.log("close do modal");
          setDialogOpen(false);
        }}
        open={dialogOpen}
      >
        {user && <ProfileEditForm user={user} />}
      </Dialog>
    </>
  );
};
