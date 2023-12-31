import { useCallback, useEffect, useRef, useState } from "react";
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
import { backendRoutes, routes } from "../routes";
import Button from "../components/Button";

export const ProfileLayout = () => {
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<number>();
  const [followed, setFollowed] = useState(false);
  const { user: loggedUser, setUser: setLoggedUser } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const debounceTimer = useRef<number>();

  const { handle } = useParams();
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    axios
      .get(backendRoutes.profile(handle))
      .then((res) => {
        setUser(res.data.user);
        setUserPosts(res.data.posts);
        setFollowed(res.data.followed);
      })
      .catch(() => {
        navigate(routes.home);
      });
  }, [handle]);

  useEffect(() => {
    fetchUser();
  }, [handle]);

  const handleDialogClick = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleUpdateSubmit = async (user: Partial<User>) => {
    try {
      const newUserData = await axios.patch(
        backendRoutes.profile(handle),
        user
      );
      setLoggedUser(newUserData.data);
      setDialogOpen(false);
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  const handleStalk = async () => {
    clearTimeout(debounceTimer.current);
    setFollowed(!followed);
    debounceTimer.current = setTimeout(async () => {
      try {
        if (followed) {
          await axios.delete(backendRoutes.user.stalk(handle));
        } else {
          await axios.post(backendRoutes.user.stalk(handle));
        }
      } catch (err) {
        console.log(err);
      }
    }, 500);
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
          { title: "Perfil", path: routes.profile(user?.handle) },
          { title: "Curtidas", path: routes.userLikes(user?.handle) },
        ]}
      >
        <section className="h-48 w-full bg-slate-300 dark:bg-zinc-700" />
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
            {user?.handle === loggedUser?.handle ? (
              <div
                onClick={handleDialogClick}
                className="absolute cursor-pointer rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-950 dark:hover:bg-zinc-900 p-6 right-4 top-4"
              >
                <BsFillPencilFill />
              </div>
            ) : (
              <div className="mt-3">
                <Button onClick={handleStalk} variant="boring" thickness="thin">
                  {followed ? "Perseguindo" : "Perseguir"}
                </Button>
              </div>
            )}
          </div>
          <div>
            <Username size="xl" variant="column" user={user} />
            <p className="text-text-light dark:text-white mt-3 text-sm">
              {user?.description}
            </p>
          </div>
        </section>
      </NavTitle>
      <Outlet />
      <Dialog
        onClose={() => {
          setDialogOpen(false);
        }}
        open={dialogOpen}
      >
        {user && <ProfileEditForm onSubmit={handleUpdateSubmit} user={user} />}
      </Dialog>
    </>
  );
};
