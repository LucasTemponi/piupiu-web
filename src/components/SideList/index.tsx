import { User } from "../../types/Users";
import { Button } from "../Button";
import { ProfilePic } from "../ProfilePic";
import { SideCard } from "../Sidecard";
import { Username } from "../Username";

type SideListProps = {
  users?: User[];
};
export const SideList = ({ users }: SideListProps) => {
  return (
    <SideCard>
      <h1 className="text-xl font-bold mb-3">Novas pessoas</h1>
      <ul>
        {users?.map((item) => {
          return (
            <li key={item.handle} className="flex items-center mb-6">
              <ProfilePic userName={item.name} image={item.image_url} />
              <div className="ml-2">
                <Username variant="column" user={item} />
              </div>
              <div className="ml-auto w-min">
                <Button variant="boring" thickness="thin">
                  Perseguir
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </SideCard>
  );
};
