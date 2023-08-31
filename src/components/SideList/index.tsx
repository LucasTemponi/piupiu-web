import { User } from "../../types/Users";
import { Button } from "../Button";
import { CircularSpinner } from "../CircularSpinner";
import { ProfilePic } from "../ProfilePic";
import { SideCard } from "../Sidecard";
import { Username } from "../Username";

type SideListProps = {
  users?: User[];
  loading?: boolean;
};
export const SideList = ({ users, loading }: SideListProps) => {
  return (
    <SideCard>
      {loading ? (
        <div className="w-full flex items-center h-52 justify-center">
          <CircularSpinner />
        </div>
      ) : (
        <>
          <h1 className="text-xl text-text-light dark:text-white font-bold mb-3">
            Novas pessoas
          </h1>
          <ul>
            {users?.map((item) => {
              return (
                <li
                  key={item.handle}
                  className="flex items-center mb-6 last:mb-0"
                >
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
        </>
      )}
    </SideCard>
  );
};
