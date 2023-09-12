import { SideBar } from "../components/SideBar";
import { SideCard } from "../components/Sidecard";
import Button from "../components/Button";
import { SideList } from "../components/SideList";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { backendRoutes } from "../routes";

export const MainLayout = () => {
  const {
    data: newUsers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["latest-users"],
    queryFn: () => axios.get(backendRoutes.latestUsers).then((res) => res.data),
    staleTime: 290000,
  });

  return (
    <>
      <SideBar />
      <div className="flex px-2 flex-col w-[100vw] ws:w-[min(566px,65vw)]">
        <Outlet />
      </div>
      <div className="ml-4 mt-12 w-72 sticky top-12 lg:w-96 h-min rounded-md hidden ws:block">
        <SideCard>
          <h1 className="text-xl text-text-light dark:text-white font-bold mb-3">
            Assine o Premium
          </h1>
          <p className="mb-2 text-text-light dark:text-white">
            Pague por uma bolinha colorida e me deixe rico.
          </p>
          <div className="w-min">
            <Button thickness="thin" variant="secondary">
              Assinar
            </Button>
          </div>
        </SideCard>
        <SideList refetch={refetch} loading={isLoading} users={newUsers} />
      </div>
    </>
  );
};
