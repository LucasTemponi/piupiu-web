import { AiOutlineArrowUp } from "react-icons/ai";
import { User } from "../../types/Users";
import Button from "../Button";
import { ProfilePicGroup } from "../ProfilePicGroup";

type RefrehPostsButtonProps = {
  newPostsUsers: User[];
  onClick?: () => void;
};
export const RefrehPostsButton = ({
  newPostsUsers,
  onClick,
}: RefrehPostsButtonProps) => {
  return (
    <div onClick={onClick} className="flex select-none hover: justify-center">
      <div className="fixed mx-auto mt-4 justify-center text-xl">
        <Button thickness="thin">
          <div className="flex justify-center items-center">
            <AiOutlineArrowUp className="h-5" />
            <ProfilePicGroup users={newPostsUsers} />
            <span className="ml-1 text-sm">
              {newPostsUsers.length === 1 ? "piou" : "piaram"}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
