import { AiOutlineArrowUp } from "react-icons/ai";
import { User } from "../../types/Users";
import Button from "../Button";
import { ProfilePicGroup } from "../ProfilePicGroup";

type RefrehPostsButtonProps = {
  newPostsUsers: User[];
};
export const RefrehPostsButton = ({
  newPostsUsers,
}: RefrehPostsButtonProps) => {
  return (
    <div className="flex justify-center">
      <div className="fixed mx-auto mt-4 justify-center text-xl">
        <Button thickness="thin">
          <div className="flex justify-center items-center">
            <AiOutlineArrowUp claName="h-4" />
            <ProfilePicGroup users={newPostsUsers} />
            <span className="ml-1 text-sm">piaram</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
