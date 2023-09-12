import axios from "axios";
import { User } from "../../types/Users";
import Button from "../Button";
import ProfilePic from "../ProfilePic";
import { Username } from "../Username";
import { useEffect, useRef, useState } from "react";
import { backendRoutes } from "../../routes";

export const SideListUserItem = ({
  user,
  refetch,
}: {
  user: User;
  refetch?: () => void;
}) => {
  const debounceTimer = useRef<number>();
  const [followed, setFollowed] = useState(user?.followed);

  const handleStalk = async () => {
    clearTimeout(debounceTimer.current);
    setFollowed(!followed);
    debounceTimer.current = setTimeout(async () => {
      try {
        if (user?.followed) {
          await axios.delete(backendRoutes.user.stalk(user.handle));
        } else {
          await axios.post(backendRoutes.user.stalk(user.handle));
        }
      } catch (err) {
        console.log(err);
      } finally {
        refetch?.();
      }
    }, 500);
  };

  useEffect(() => {
    setFollowed(user?.followed);
  }, [user]);

  return (
    <li key={user.handle} className="flex items-center mb-6 last:mb-0 ">
      <ProfilePic userName={user.name} image={user.image_url} />
      <div className="ml-2 overflow-hidden text-ellipsis">
        <Username variant="column" user={user} />
      </div>
      <div className="ml-auto w-min">
        <Button onClick={handleStalk} variant="boring" thickness="thin">
          {followed ? "Perseguindo" : "Perseguir"}
        </Button>
      </div>
    </li>
  );
};
