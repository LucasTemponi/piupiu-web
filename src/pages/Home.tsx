import axios from "axios";
import { useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { useAuth } from "../contexts/Auth";
import { PiupiuList } from "../components/PiupiuList";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "../service/queryClient";

export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const { user } = useAuth();
  const {
    data: piupius,
    isLoading,
    refetch,
  } = useQuery<Piu[]>({
    queryKey: ["pius"],
    queryFn: () => axios.get("/pius").then((res) => res.data),
    cacheTime: 4500,
    refetchInterval: 5000,
  });
  const { mutateAsync, isLoading: addingPiupiu } = useMutation({
    mutationFn: (textValue: string) =>
      axios
        .post("/posts", {
          message: textValue,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["pius"], (oldData: Piu[] | undefined) => {
        return oldData ? [data, ...oldData] : data;
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try{
      const res = await mutateAsync(textValue);
      console.log({res})
      setTextValue("");

    }catch(e){
      console.log('deu ruim na hora de piar... ', e)
    }
  };

  return (
    <div className="relative">
      <NavTitle
        position="sticky"
        navOptions={[
          { title: "Para você", path: "/home" },
          { title: "Seguindo", path: "/following" },
        ]}
      >
        <h2 className="text-xl font-bold px-4 py-3 ">Casa</h2>
      </NavTitle>
      {user && (
        <NewPiupiu
          loading={addingPiupiu}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onSubmit={handleSubmit}
          user={user}
        />
      )}
      <PiupiuList loading={isLoading} piupius={piupius} onChange={refetch} />
    </div>
  );
};
