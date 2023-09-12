import { User } from "../../types/Users";
import { CircularSpinner } from "../CircularSpinner";
import { SideCard } from "../Sidecard";
import { SideListUserItem } from "../SideListUserItem";

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
              return <SideListUserItem key={item.handle} user={item} />;
            })}
          </ul>
        </>
      )}
    </SideCard>
  );
};
