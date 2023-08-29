import axios from "axios";
import { useRef, useState } from "react";
import { NewPiupiu } from "../components/NewPiupiu";
import { Piu } from "../types/Pius";
import NavTitle from "../components/NavTitle";
import { useAuth } from "../contexts/Auth";
import { PiupiuList } from "../components/PiupiuList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../service/queryClient";
import { usePagination } from "../hooks/useScroll";

export const Home = () => {
  const [textValue, setTextValue] = useState("");
  const [piupius, setPiupius] = useState<Piu[] | undefined>();
  const [newData, setNewData] = useState<Piu[] | undefined>();

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const topIsShowing = useRef(true);

  const { user } = useAuth();

  const { scrollTop } = usePagination({
    onBottomEnter: () => {
      console.log("BOTTOMENTER");
    },
    onTopEnter: () => {
      console.log("TOPENTER");
      setPiupius(data);
      setNewData(undefined);
      topIsShowing.current = true;
    },
    onTopLeave: () => {
      console.log("TOPLEAVE");
      topIsShowing.current = false;
    },
    bottomRef,
    topRef,
  });

  const { data, isLoading, refetch } = useQuery<Piu[]>({
    queryKey: ["pius"],
    queryFn: () => axios.get("/pius").then((res) => res.data),
    cacheTime: 4500,
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    structuralSharing: (oldData, newData) => {
      if (!oldData || !piupius) {
        setPiupius(newData);
        return newData;
      }
      const newItems: Piu[] = [];
      const oldItems: Piu[] = [];
      newData?.forEach((item) => {
        const itemIsOld = oldData?.find((piu) => piu.id === item.id);
        itemIsOld ? oldItems.push(item) : newItems.push(item);
      });
      if (newItems?.length !== 0 && !topIsShowing.current) {
        setNewData((newData) =>
          newData ? [...newData, ...newItems] : newItems
        );
        setPiupius(oldItems);
      } else {
        setPiupius(newData);
      }
      return newData;
    },
  });

  const { mutate, isLoading: addingPiupiu } = useMutation({
    mutationFn: (textValue: string) =>
      axios
        .post("/posts", {
          message: textValue,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["pius"], (oldData: Piu[] | undefined) => {
        const newState = oldData ? [data, ...oldData] : [data];
        setPiupius(newState);
        return newState;
      });
    },
    onError: (err) => console.log("deu ruim na hora de piar... ", err),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(textValue, {
      onSuccess: () => {
        setTextValue("");
      },
    });
  };

  return (
    <div ref={topRef} className="relative">
      <NavTitle
        position="sticky"
        navOptions={[
          { title: "Para você", path: "/home" },
          { title: "Perseguindo", path: "/following" },
        ]}
        refreshButton={{
          newPosts: newData,
          onClick: () => {
            scrollTop();
          },
        }}
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
      <PiupiuList
        topRef={topRef}
        bottomRef={bottomRef}
        loading={isLoading}
        piupius={piupius}
        onChange={refetch}
      />
    </div>
  );
};
