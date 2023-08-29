import { User } from "../../types/Users";
import ProfilePic from "../ProfilePic";

const picZIndex = ["z-[3]", "z-[2]", "z-[1]"];
export const ProfilePicGroup = ({ users }: { users: User[] }) => {
  return (
    <div className="flex relative">
      {users.map((user, index) => {
        return (
          <div
            className={`${index === 0 ? "ml-1" : "-ml-3"} ${picZIndex[index]}`}
            key={user.handle}
          >
            <ProfilePic
              variant="verySmall"
              userName={user.name}
              image={user.image_url}
            />
          </div>
        );
      })}
    </div>
  );
};
