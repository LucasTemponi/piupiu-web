import { useEffect, useState } from "react";
import { SideBar } from "../SideBar";
import { SideCard } from "../Sidecard";
import Button from "../Button";
import { SideList } from "../SideList";
import { User } from "../../types/Users";
import axios from "axios";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [newUsers, setNewUsers] = useState<User[]>();

  useEffect(() => {
    axios.get("http://192.168.0.43:3000/users/latest").then((res) => {
      setNewUsers(res.data);
    });
  }, []);

  return (
    <>
      <SideBar />
      <div className="flex px-2 flex-col w-[95vw] ws:w-[min(566px,65vw)]">
        {children}
      </div>
      <div className="ml-4 mt-12 w-72 lg:w-96 h-min rounded-md hidden ws:block">
        <SideCard>
          <h1 className="text-xl font-bold mb-3">Assine o Premium</h1>
          <p className="mb-2">
            Pague por uma bolinha colorida e me deixe rico.
          </p>
          <div className="w-min">
            <Button thickness="thin" variant="secondary">
              Assinar
            </Button>
          </div>
        </SideCard>
        <SideList users={newUsers} />
      </div>
    </>
  );
};
