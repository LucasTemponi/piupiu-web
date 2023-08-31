import axios from "axios";
import { Piu } from "../types/Pius";
import { useParams } from "react-router-dom";
import { PiupiuList } from "../components/PiupiuList";
import { useQuery } from "@tanstack/react-query";
import { backendRoutes } from "../routes";

type ProfileProps = {
  postsRoute: "posts" | "likes";
};
export const Profile = ({ postsRoute }: ProfileProps) => {
  const { handle } = useParams();

  const { data, isLoading } = useQuery<Piu[]>({
    queryKey: [`${handle}-${postsRoute}`],
    queryFn: async () => {
      return axios.get(backendRoutes.user[postsRoute](handle)).then((res) => {
        return res.data;
      });
    },
    cacheTime: 300000,
    refetchInterval: 301000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <>
      <main>
        <PiupiuList initialLoading={isLoading} piupius={data} />
      </main>
    </>
  );
};
