import { useState } from "react";
import { User } from "../../types/Users";
import { Popover } from "../Popover";
import { ProfilePic } from "../ProfilePic";
import { Username } from "../Username";

type SessionControllerProps = {
  user: User;
  options: {
    text: string;
    onClick: () => void;
  }[];
};
export const SessionController = ({
  options,
  user,
}: SessionControllerProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`relative hidden xl:flex gap-4 cursor-pointer p-3 rounded-full ${
        isActive ? "" : "hover:bg-zinc-900"
      } items-center`}
    >
      <Popover onChange={setIsActive} open={isActive}>
        {options.map((item) => (
          <span
            className="py-2 px-4 hover:bg-zinc-900 flex justify-start"
            key={item.text}
            onClick={item.onClick}
          >
            {item.text}
          </span>
        ))}
      </Popover>

      <ProfilePic image={user.image_url} userName={user.name} />
      <Username
        showVerified={false}
        clickable={false}
        variant="column"
        user={user}
      />
      <span className="text-2xl ml-auto self-start ">...</span>
    </button>
  );
};

export default SessionController;
